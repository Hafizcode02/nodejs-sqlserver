const userMSSql = require('./user.mssql');
const jsonwebtoken = require('jsonwebtoken');

const JWT_SECRET =
    "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu"; // Ini harusnya di bikin env terpisah

class User {
    async getAllUsers(req, res) {
        if (!req.headers.authorization) {
            return res.status(401).json({ error: "Not Authorized" });
        }
        // Bearer <token>>
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];

        try {
            jsonwebtoken.verify(token, JWT_SECRET);
            const output = await userMSSql.getAllUsers();
            res.send(output);
        } catch (error) {
            res.status(401).json({ error: "Invalid Signature!" });
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
                return res.status(output.statuscode).json({ message: output.message, token: jsonwebtoken.sign({ user: output.user }, JWT_SECRET) });
            }
            return res.status(output.statuscode).json({ message: output.message });
        } catch (error) {
            res.status(500).json({ error: "There are something wrong in the server!" });
            console.log(error);
        }
    }
}

module.exports = new User();