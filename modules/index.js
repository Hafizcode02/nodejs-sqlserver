class Module {
    constructor(app){
        this.app = app;
    }
    init(){
        const menuController = require('./menu/menu.controller');
        new menuController(this.app);

        const userController = require('./user/user.controller');
        new userController(this.app);
    }
}

module.exports = Module;