const user = require('./user');
const express = require('express');
const router = express.Router();

class UserController {
    constructor(app) {
        router.get('/', user.getAllUsers);
        app.use('/api/v1/users', router);
    }
}

module.exports = UserController;