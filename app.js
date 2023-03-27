const express = require('express');
const bodyparser = require('body-parser');
const app = express();
async function init() {
    app.use(bodyparser.json({ limit: '50mb' }));
    app.use(bodyparser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
    const appRouting = require('./modules');
    const appModules = new appRouting(app);
    appModules.init();
}

init();
module.exports = app;