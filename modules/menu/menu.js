const menuMssql = require('./menu.mssql');

class Menu {
    async getAllMenus(req, res) {
        try {
            const output = await menuMssql.getAllMenus();
            res.send(output);
        } catch (error) {
            console.log(error);
        }
    }

    async addMenus(req, res) {
        try {
            const output = await menuMssql.addMenus(req.body);
            res.send(output);
        }
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = new Menu();