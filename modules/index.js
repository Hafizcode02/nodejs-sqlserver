class Module {
    constructor(app){
        this.app = app;
    }
    init(){
        const menuController = require('./menu/menu.controller');
        new menuController(this.app);
    }
}

module.exports = Module;