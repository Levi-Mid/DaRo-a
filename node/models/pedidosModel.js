const {mssql} = require("../config/db")

async function getPedidos(id_usuario) {
    const request = new mssql.Request()

    request.input("id_usuario", mssql.Int, id_usuario)

    const query = `SELECT id_pedido, produtos, frequencia FROM daroca.pedidos WHERE usuario_id = @id_usuario`
    const response = await request.query(query)

    return response.recordset
}

async function deletePedidos(id) {
    const request = new mssql.Request()

    request.input("id", mssql.Int, id)

    const query = `DELETE FROM daroca.pedidos WHERE id_pedido = @id`
    const response = await request.query(query)

    return response.rowsAffected
}

module.exports = {getPedidos, deletePedidos}