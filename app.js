const express = require('express');
const app = express();
async function init(){
    const appRouting = require('./modules');
    const appModules = new appRouting(app);
    appModules.init();
}

init();
module.exports = app;