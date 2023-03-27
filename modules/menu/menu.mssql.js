const Hashids = require('hashids/cjs')

const mssqlCon = require('../../dbconnection');
const hashids = new Hashids('lks23', 16)

class MenuMSSql {
    async getAllMenus() {
        const conn = await mssqlCon.getConn();
        const res = await conn.request().query('SELECT Id, Name, Price FROM MsMenu');
        const result = res.recordset;
        const expectedResult = Object.keys(result).map(key => {
            let data = {};
            data = result[key];
            data.Id = hashids.encode(data.Id);
            return data;
        });

        return expectedResult;
    }

    async addMenus(menuData) {
        const conn = await mssqlCon.getConn();
        const res = await conn.request()
            .query(`INSERT INTO MsMenu (Name, Price, Photo, Carbo, Protein) VALUES ('${menuData.name}', '${menuData.price}', '-', 0, 0)`);
        return res;
    }
}
module.exports = new MenuMSSql();