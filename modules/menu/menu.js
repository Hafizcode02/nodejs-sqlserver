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

    async updateMenus(req, res) {
        const id = req.params.id;
        try {
            if (!id) {
                console.log('id not passed');
            }
            const output = await menuMssql.updateMenus(req.body, id);
            res.send(output);
        }
        catch (error) {
            console.log(error);
        }
    }

    async deleteMenus(req, res) {
        const id = req.params.id;
        try {
            if (!id) {
                console.log('id not passed');
            }
            const output = await menuMssql.deleteMenus(id);
            res.send(output);
        }
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = new Menu();