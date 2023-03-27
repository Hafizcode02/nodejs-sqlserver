const menu = require('./menu');
const express = require('express');
const router = express.Router();

class MenuController {
    constructor(app) {
        router.get('/', menu.getAllMenus);
        router.post('/', menu.addMenus);
        router.put('/:id', menu.updateMenus);
        router.delete('/:id', menu.deleteMenus);
        app.use('/api/v1/menus', router);
    }
}

module.exports = MenuController;