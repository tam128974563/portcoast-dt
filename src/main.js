const path = require('path');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const express = require('express');
const http = require('http');
const compression = require('compression');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');

const utils = require('./utils');
const route = require('./route')
const db = () => {

}

const main = () => {
    const app = express();
    app.use(bodyparser.urlencoded({
        extended: true,
    }));
    app.use(bodyparser.json());
    app.use(compression());
    app.use('/public', express.static(path.join(utils.rootPath, '/public')));
    app.use(favicon(path.join(utils.rootPath, '/public/images', 'favicon.ico')));
    app.use(express.static(path.join(utils.rootPath, '/public'), {
        maxAge: 259000000
    }));
    app.set('view engine', 'ejs');

    app.use('/', route);
    const server = http.createServer(app);
    const port = process.env.PORT || 5500;

    app.listen(port, () => {
        console.log('\x1b[32m%s\x1b[0m', `Server running at port ${port}`);
    });
}

main();