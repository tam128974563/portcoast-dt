const path = require('path');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const express = require('express');
const http = require('http');
const compression = require('compression');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const utils = require('./utils');
const route = require('./route')
const db = require('./connectDB');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const main = () => {
    try {
        db()
    } catch (error) {
        console.log(error)
    }

    const app = express();
    app.use(bodyparser.urlencoded({
        extended: true,
    }));

    app.use(bodyparser.json());
    app.use(compression());
    app.use('/public', express.static(path.join(utils.rootPath, '/public')));
    app.use(favicon(path.join(utils.rootPath, '/public/images/', 'favicon.ico')));
    app.use(express.static(path.join(utils.rootPath, '/public'), {
        maxAge: 259000000
    }));

    app.set('view engine', 'ejs');
    app.locals.dir = path.join(utils.rootPath, '/views/');
    const fileStoreOptions = {
        path: './src/data/session', // the directory where session data will be stored
        ttl: 3600 // the time-to-live (in seconds) for the session data
    };
    const sessionMiddleware = session({
        store: new FileStore(fileStoreOptions),
        secret: 'test-sssecret',
        resave: false,
        saveUninitialized: false
    });
    app.use(sessionMiddleware);
    app.use(passport.initialize());
    app.use(passport.authenticate('session'));

    app.use('/', route);

    //app.use(passport.session());
    const server = http.createServer(app);
    const port = process.env.PORT || 5500;

    app.listen(port, () => {
        console.log('\x1b[32m%s\x1b[0m', `Server running at port ${port}`);
    });
}

main();