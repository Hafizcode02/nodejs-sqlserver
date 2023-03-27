const Hashids = require('hashids/cjs')

const mssqlCon = require('../../dbconnection');
const hashids = new Hashids('lks23', 16)

class MenuMSSql {

    async checkExistedData(id) {
        const conn = await mssqlCon.getConn();
        const res = await conn.request().query(`SELECT * FROM MsMenu WHERE Id=${hashids.decode(id)}`);
        console.log(res);

        if (res) {
            return true;
        }
        return false;
    }

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

        if (typeof (menuData.name) != "string") {
            return {
                "statuscode": 400,
                "message": "name is must string!",
            };
        }

        if (typeof (menuData.price) != "number") {
            return {
                "statuscode": 400,
                "message": "price is must number!"
            };
        }

        const conn = await mssqlCon.getConn();
        const res = await conn.request()
            .query(`INSERT INTO MsMenu (Name, Price, Photo, Carbo, Protein) VALUES ('${menuData.name}', '${menuData.price}', '-', 0, 0)`);

        res["statuscode"] = 200;
        res["message"] = "Menu Added Successfully";
        return res;
    }

    async updateMenus(menuData, id) {

        if ((id.trim().length <= 15) || Object.keys(hashids.decode(id)).length === 0) {
            return {
                "statuscode": 400,
                "message": "An Error Occured with Id!"
            }
        }

        if (!this.checkExistedData(id)) {
            return {
                "statuscode": 404,
                "message": "Data Not Found!"
            }
        }

        if (typeof (menuData.name) != "string") {
            return {
                "statuscode": 400,
                "message": "name is must string!",
            };
        }

        if (typeof (menuData.price) != "number") {
            return {
                "statuscode": 400,
                "message": "price is must number!"
            };
        }

        const conn = await mssqlCon.getConn();
        const res = await conn.request()
            .query(`UPDATE MsMenu SET Name='${menuData.name}', Price=${menuData.price} WHERE Id=${hashids.decode(id)}`);

        res["statuscode"] = 200;
        res["message"] = "Menu Updated Successfully";
        return res;
    }

    async deleteMenus(id) {

        if ((id.trim().length <= 15) || Object.keys(hashids.decode(id)).length === 0) {
            return {
                "statuscode": 400,
                "message": "An Error Occured with Id!"
            }
        }

        const conn = await mssqlCon.getConn();
        const res = await conn.request()
            .query(`DELETE FROM MsMenu WHERE Id=${hashids.decode(id)}`);

        if (res["rowsAffected"][0] != 0) {
            res["statuscode"] = 200;
            res["message"] = "Menu Deleted Successfully";
            return res;
        } else {
            res["statuscode"] = 404;
            res["message"] = "Menu List Not Found";
            return res;
        }
    }
}
module.exports = new MenuMSSql();