const userMSSql = require('./user.mssql');

class User {
    async getAllUsers(req, res) {
        try {
            const output = await userMSSql.getAllUsers();
            res.send(output);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new User();