const menuMssql = require('./menu.mssql');
const jsonwebtoken = require('jsonwebtoken');

const JWT_SECRET =
    "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu"; // Ini harusnya di bikin env terpisah (bisa diganti juga)

class Menu {
    async getAllMenus(req, res) {
        if (!req.headers.authorization) {
            return res.status(401).json({ error: "Not Authorized" });
        }

        // Bearer <token>>
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];

        try {
            jsonwebtoken.verify(token, JWT_SECRET);
        } catch (error) {
            res.status(401).json({ error: "Invalid Signature!" });
            console.log(error);
        }

        try {
            const output = await menuMssql.getAllMenus();
            res.send(output);
        } catch (error) {
            res.status(500).json({ error: "There are something wrong in the server!" });
            console.log(error);
        }
    }

    async addMenus(req, res) {
        if (!req.headers.authorization) {
            return res.status(401).json({ error: "Not Authorized" });
        }

        try {
            const output = await menuMssql.addMenus(req.body);
            res.status(output.statuscode).json({ message: output.message });
        }
        catch (error) {
            res.status(500).json({ error: "There are something wrong in the server!" });
            console.log(error);
        }
    }

    async getMenuById(req, res) {
        if (!req.headers.authorization) {
            return res.status(401).json({ error: "Not Authorized" });
        }

        const id = req.params.id;
        try {
            if (!id) {
                console.log('id not passed');
            }
            const output = await menuMssql.getMenuById(id);

            res.status(output.statuscode).json({ message: output.message, data: output.recordset });
        }
        catch (error) {
            res.status(500).json({ error: "There are something wrong in the server!" });
            console.log(error);
        }
    }

    async updateMenus(req, res) {
        if (!req.headers.authorization) {
            return res.status(401).json({ error: "Not Authorized" });
        }

        const id = req.params.id;
        try {
            if (!id) {
                console.log('id not passed');
            }
            const output = await menuMssql.updateMenus(req.body, id);
            res.status(output.statuscode).json({ message: output.message });
        }
        catch (error) {
            res.status(500).json({ error: "There are something wrong in the server!" });
            console.log(error);
        }
    }

    async deleteMenus(req, res) {

        if (!req.headers.authorization) {
            return res.status(401).json({ error: "Not Authorized" });
        }

        const id = req.params.id;
        try {
            if (!id) {
                console.log('id not passed');
            }
            const output = await menuMssql.deleteMenus(id);
            res.status(output.statuscode).json({ message: output.message });
        }
        catch (error) {
            res.status(500).json({ error: "There are something wrong in the server!" });
            console.log(error);
        }
    }
}

module.exports = new Menu();