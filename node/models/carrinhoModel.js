const { mssql, config } = require("../config/db");
const { json } = require("express");

async function addProdutoAoCarrinho(id_usuario, id_produto, quantidade) {

    const pool = await mssql.connect(config);

    //Procurar carrinho ativo
    let resultCarrinho = await pool.request()
        .input("id_usuario", mssql.Int, id_usuario)
        .query(`
            SELECT id_carrinho 
            FROM daroca.carrinho
            WHERE id_usuario = @id_usuario AND status = 'ativo'
        `);

    let id_carrinho;

    if (resultCarrinho.recordset.length === 0) {
        // Criar novo carrinho
        let novo = await pool.request()
            .input("id_usuario", mssql.Int, id_usuario)
            .query(`
                INSERT INTO daroca.carrinho (id_usuario, data_criacao, status)
                OUTPUT INSERTED.id_carrinho
                VALUES (@id_usuario, GETDATE(), 'ativo')
            `);

        id_carrinho = novo.recordset[0].id_carrinho;

    } else {
        id_carrinho = resultCarrinho.recordset[0].id_carrinho;
    }

    //Verificar se o produto já existe no carrinho
    let item = await pool.request()
        .input("id_carrinho", mssql.Int, id_carrinho)
        .input("id_produto", mssql.Int, id_produto)
        .query(`
            SELECT quantidade 
            FROM daroca.itenscarrinho
            WHERE id_carrinho = @id_carrinho AND id_produto = @id_produto
        `);

    //Atualizar ou inserir item
    if (item.recordset.length > 0) {
        await pool.request()
            .input("id_carrinho", mssql.Int, id_carrinho)
            .input("id_produto", mssql.Int, id_produto)
            .input("quantidade", mssql.Int, quantidade)
            .query(`
                UPDATE daroca.itenscarrinho
                SET quantidade = quantidade + @quantidade
                WHERE id_carrinho = @id_carrinho AND id_produto = @id_produto
            `);

    } else {
        await pool.request()
            .input("id_usuario", mssql.Int, id_usuario)
            .input("id_carrinho", mssql.Int, id_carrinho)
            .input("id_produto", mssql.Int, id_produto)
            .input("quantidade", mssql.Int, quantidade)
            .query(`
                INSERT INTO daroca.itenscarrinho (id_carrinho, id_produto, quantidade, id_usuario)
                VALUES (@id_carrinho, @id_produto, @quantidade, @id_usuario)
            `);
    }

    return {
        id_carrinho,
        mensagem: "Produto adicionado ao carrinho com sucesso"
    };
}




// PEGAR CARRINHO DO USUÁRIO

async function getCarrinhoDoUsuario(id_usuario) {

    const pool = await mssql.connect(config);

    // Pegar carrinho ativo
    const carrinho = await pool.request()
        .input('id_usuario', mssql.Int, id_usuario)
        .query(`
            SELECT id_carrinho 
            FROM daroca.carrinho 
            WHERE id_usuario = @id_usuario AND status = 'ativo'
        `);

    if (carrinho.recordset.length === 0) {
        return null; // Não existe carrinho — retorna vazio
    }

    const idCarrinho = carrinho.recordset[0].id_carrinho;

    // Buscar itens
    const itens = await pool.request()
        .input('idCarrinho', mssql.Int, idCarrinho)
        .query(`
            SELECT 
                ic.id_item,
                ic.id_carrinho,
                ic.id_produto,
                ic.quantidade,
                p.nome,
                p.valor,
                p.imagem,
                p.descricao,
                p.categoria
            FROM daroca.itenscarrinho ic
            JOIN daroca.produtos p ON p.id = ic.id_produto
            WHERE ic.id_carrinho = @idCarrinho
        `);

    return itens.recordset;
}

async function removerItemDoCarrinho(id_item, id_usuario) {
    let request = new mssql.Request();
    request.input("id_item", mssql.Int, id_item);
    request.input("id_usuario", mssql.Int, id_usuario)

    await request.query(`
        DELETE FROM daroca.itenscarrinho
        WHERE id_item = @id_item AND id_usuario = @id_usuario
    `);

    return true;
}

//FINALIZAR
async function finalizarCarrinho(id_usuario, frequencia) {
    const pool = await mssql.connect(); 
    const transaction = new mssql.Transaction(pool);

    try {
        await transaction.begin();

        const selectReq = new mssql.Request(transaction);
        selectReq.input("id_usuario", mssql.Int, id_usuario);

        const itens = await selectReq.query(`
            SELECT 
                p.id AS id_produto,
                p.nome,
                p.valor,
                i.quantidade
            FROM daroca.itenscarrinho i
            JOIN daroca.produtos p ON p.id = i.id_produto
            WHERE i.id_usuario = @id_usuario
        `);

        if (itens.recordset.length === 0) {
            await transaction.rollback();
            return { msg: "Carrinho vazio" };
        }

        const jsonProdutos = JSON.stringify(itens.recordset);

        const insertReq = new mssql.Request(transaction);
        insertReq.input("usuario_id", mssql.Int, id_usuario);
        insertReq.input("produtos", mssql.VarChar(mssql.MAX), jsonProdutos);
        insertReq.input("frequencia", mssql.Char(2), frequencia);

        const insertResult = await insertReq.query(`
            INSERT INTO daroca.pedidos (usuario_id, produtos, frequencia)
            VALUES (@usuario_id, @produtos, @frequencia);

            SELECT SCOPE_IDENTITY() AS id_pedido;
        `);

        const id_pedido = insertResult.recordset[0].id_pedido;

        const deleteReq = new mssql.Request(transaction);
        deleteReq.input("id_usuario", mssql.Int, id_usuario);

        await deleteReq.query(`
            DELETE FROM daroca.itenscarrinho WHERE id_usuario = @id_usuario
        `);

        await transaction.commit();

        return {
            msg: "Pedido finalizado com sucesso!",
            id_pedido
        };
    }
    catch (erro) {
        await transaction.rollback();
        throw erro;
    }
}

module.exports = { addProdutoAoCarrinho, getCarrinhoDoUsuario, removerItemDoCarrinho, finalizarCarrinho };
