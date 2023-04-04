const user = require('./user');
const express = require('express');
const router = express.Router();

class UserController {
    constructor(app) {
        router.get('/users', user.getAllUsers);
        router.post('/register', user.registerUser);
        router.post('/login', user.loginUser);
        app.use('/api/v1/', router);
    }
}

module.exports = UserController;