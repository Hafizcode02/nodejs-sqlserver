const mssqlCon = require('../../dbconnection');
const randomstring = require('randomstring');

class UserMSSql {
    async getAllUsers() {
        const conn = await mssqlCon.getConn();
        const res = await conn.request().query(`SELECT * FROM MsEmployee`);

        return res.recordset;
    }

    async registerUser(userData) {

        if (userData.name && userData.email && userData.password && userData.phone) {
            const conn = await mssqlCon.getConn();
            const res = await conn.request().query(`INSERT INTO MsEmployee (Id, Name, Email, Password, Handphone, Position) VALUES ('${randomstring.generate(6)}','${userData.name}', '${userData.email}', '${userData.password}', '${userData.phone}', 'admin')`);

            res["statuscode"] = 200;
            res["message"] = "User Added Successfully";
            return res;
        }

        res["statuscode"] = 400;
        res["message"] = "Something Wrong with the request, please check again!";
        return res;
    }
}

module.exports = new UserMSSql();