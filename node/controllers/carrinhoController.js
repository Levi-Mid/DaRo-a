const carrinhoModel = require("../models/carrinhoModel");

async function adicionarAoCarrinho(req, res) {
    const { id_produto, quantidade } = req.body;

    // ID de teste (substituir depois pelo usuário logado)
    const id_usuario = req.user.id;
    console.log(id_usuario)

    if (!id_produto || !quantidade || quantidade < 1) {
        return res.status(400).json({ mensagem: "Dados inválidos: id_produto e quantidade são obrigatórios." });
    }

    try {
        const resultado = await carrinhoModel.addProdutoAoCarrinho(id_usuario, id_produto, quantidade);
        res.status(200).json(resultado);
    } catch (error) {
        console.error("Erro ao adicionar produto ao carrinho:", error);
        res.status(500).json({ mensagem: "Erro interno do servidor ao processar o carrinho." });
    }
}

async function mostrarCarrinho(req, res) {
    const id_usuario = req.user.id; // substituir depois pela sessão

    try {
        const itens = await carrinhoModel.getCarrinhoDoUsuario(id_usuario);

        if (!itens) {
            return res.status(200).json({
                itens: [],
                total: "0.00"
            });
        }

        //  adicionar subtotal para cada item
        const itensComSubtotal = itens.map(item => {
            const subtotal = Number(item.valor) * Number(item.quantidade);
            return {
                ...item,
                subtotal: subtotal
            };
        });

        // calcular total
        const totalGeral = itensComSubtotal.reduce((acc, item) => acc + item.subtotal, 0);

        res.status(200).json({
            itens: itensComSubtotal,
            total: totalGeral.toFixed(2)
        });

    } catch (error) {
        console.error("Erro ao carregar o carrinho:", error);
        res.status(500).json({ mensagem: "Erro interno do servidor ao carregar o carrinho." });
    }
}

async function removerItem(req, res) {
    const { id_item } = req.params;
    const id_usuario = req.user.id

    try {
        const resultado = await carrinhoModel.removerItemDoCarrinho(id_item, id_usuario);
        res.status(200).json({ mensagem: "Item removido com sucesso!" });
    } catch (error) {
        console.error("Erro ao remover item:", error);
        res.status(500).json({ mensagem: "Erro interno ao remover item." });
    }
}


module.exports = { adicionarAoCarrinho, mostrarCarrinho, removerItem };