const mssqlCon = require('../../dbconnection');

class UserMSSql {
    async getAllUsers() {
        const conn = await mssqlCon.getConn();
        const res = await conn.request().query(`SELECT * FROM MsEmployee`);

        return res.recordset;
    }
}

module.exports = new UserMSSql();