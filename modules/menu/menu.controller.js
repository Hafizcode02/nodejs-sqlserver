const menu = require('./menu');
const express = require('express');
const router = express.Router();

class MenuController {
    constructor(app) {
        router.get('/', menu.getAllMenus);
        app.use('/api/v1/menus', router);
    }
}

module.exports = MenuController;