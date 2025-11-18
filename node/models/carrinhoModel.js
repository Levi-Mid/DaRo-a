const { mssql, config } = require("../config/db");


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
            .input("id_carrinho", mssql.Int, id_carrinho)
            .input("id_produto", mssql.Int, id_produto)
            .input("quantidade", mssql.Int, quantidade)
            .query(`
                INSERT INTO daroca.itenscarrinho (id_carrinho, id_produto, quantidade)
                VALUES (@id_carrinho, @id_produto, @quantidade)
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

async function removerItemDoCarrinho(id_item) {
    let request = new mssql.Request();
    request.input("id_item", mssql.Int, id_item);

    await request.query(`
        DELETE FROM daroca.itenscarrinho
        WHERE id_item = @id_item
    `);

    return true;
}


module.exports = { addProdutoAoCarrinho, getCarrinhoDoUsuario, removerItemDoCarrinho };
