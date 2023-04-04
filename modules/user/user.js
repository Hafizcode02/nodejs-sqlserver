const userMSSql = require('./user.mssql');

class User {
    async getAllUsers(req, res) {
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
}

module.exports = new User();