const menuMssql = require('./menu.mssql');

class Menu {
    async getAllMenus(req, res) {
        try {
            const output = await menuMssql.getAllMenus();
            res.send(output);
        } catch (error) {
            res.status(500).json({ error: "There are something wrong in the server!"});
            console.log(error);
        }
    }

    async addMenus(req, res) {
        try {
            const output = await menuMssql.addMenus(req.body);
            res.status(output.statuscode).json({message : output.message});
        }
        catch (error) {
            res.status(500).json({ error: "There are something wrong in the server!"});
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
            res.status(output.statuscode).json({message : output.message});
        }
        catch (error) {
            res.status(500).json({ error: "There are something wrong in the server!"});
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
            res.status(output.statuscode).json({message : output.message});
        }
        catch (error) {
            res.status(500).json({ error: "There are something wrong in the server!"});
            console.log(error);
        }
    }
}

module.exports = new Menu();