const userMSSql = require('./user.mssql');
const jsonwebtoken = require('jsonwebtoken');

const JWT_SECRET =
    "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";
class User {
    async getAllUsers(req, res) {
        if (!req.headers.authorization) {
            return res.status(401).json({ error: "Not Authorized" });
        }

        try {
            const output = await userMSSql.getAllUsers();
            res.send(output);
        } catch (error) {
            res.status(500).json({ error: "There are something wrong in the server!" });
            console.log(error);
        }
    }

    async registerUser(req, res) {
        try {
            const output = await userMSSql.registerUser(req.body);
            res.status(output.statuscode).json({ message: output.message });
        } catch (error) {
            res.status(500).json({ error: "There are something wrong in the server!" });
            console.log(error);
        }
    }

    async loginUser(req, res) {
        try {
            const output = await userMSSql.login(req.body);
            if (output.statuscode == 200) {
                return res.status(output.statuscode).json({ message: output.message, token: jsonwebtoken.sign({ user: req.body.email }, JWT_SECRET) });
            }
            return res.status(output.statuscode).json({ message: output.message });
        } catch (error) {
            res.status(500).json({ error: "There are something wrong in the server!" });
            console.log(error);
        }
    }
}

module.exports = new User();