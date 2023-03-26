const mssqlCon = require('../../dbconnection');

class MenuMSSql {
    async getAllMenus(){
        const conn = await mssqlCon.getConn();
        const res = await conn.request().query('SELECT * FROM MsMenu');
        return res.recordset;
    }
}
module.exports = new MenuMSSql();