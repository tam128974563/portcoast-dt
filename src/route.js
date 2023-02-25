const {
    Router,
} = require('express');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const utils = require('./utils.js');
const news = require('./newsController');
const project = require('./projectController');

const users = require('./data/user.json');

const pages = require('./data/pages.json');
const homePage = (req, res) => {
    res.render('index', {
        lang: "en",
        page: " ",
        en: " ",
        vi: "trang-chu",
    });
}

passport.use(new LocalStrategy(
    verify = (username, password, done) => {
        let [
            user
        ] = users.filter(user => user.user === username);
        console.log(user)
        if (user === undefined) {
            console.log('incorect')
            return done(null, false), {
                //message: 'Incorrect User'
            };
        }
        if (user.pass !== password) {
            console.log('wrong passs')
            return done(null, false, {
                //message: 'Incorrect password'
            });
        }
        return done(null, user);
    }
));

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, {
            id: user.id,
            username: user.username
        });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});
const pageController = (req, res) => {
    let url = utils.getUrl(req.url);
    res.render(`${req.params.id}`, {
        lang: url.lang,
        page: req.params.id,
        en: url.en,
        vi: url.vi,
    });
}

const subPageController = (req, res) => {

    let url;
    if (req.url.indexOf("/en/") !== -1) {
        url = {
            lang: "en",
            folder: pages.filter(item => item.en === `${req.params.folder}`)[0],
            ...pages.filter(item => item.en === `${req.params.page}`)[0],
        };
    } else {
        url = {
            lang: "vi",
            folder: pages.filter(item => item.vi === `${req.params.folder}`)[0],
            ...pages.filter(item => item.vi === `${req.params.page}`)[0],
        };
    }
    res.render(`${req.params.folder}/${req.params.page}`, {
        dir: path.join(utils.rootPath, '/views/'),
        lang: url.lang,
        page: req.params.folder,
        en: `${url.folder.en}/${url.en}`,
        vi: `${url.folder.vi}/${url.vi}`,
    });
}
const sitemap = (req, res) => {
    res.sendFile(path.join(utils.rootPath, '/src/sitemap.xml'));
}

const clearAccent = (req, res) => {
    const url_en = utils.clearAccent(req.body.title_en);
    const url_vi = utils.clearAccent(req.body.title_vi);
    console.log(req.body.date)
    const folder = `${req.body.date.split("/").reverse().join("")}-${url_en}`;
    const data = {
        url_en,
        url_vi,
        folder,
    };
    res.json(data);
}
const loginForm = (req, res) => {
    res.render("forms/login");
}
const login = (req, res) => {
    console.log(req.body)
}

const createRoutes = () => {
    const route = Router();
    //Api route
    route.post('/api/clean-accent', clearAccent)

    route.get('/', homePage)
    route.get('/news', news.route);
    //Eng route
    route.get('/en', (req, res) => res.redirect('/'));
    route.get('/en/projects', project.route);
    route.get('/en/projects/:id', project.page)
    route.get('/en/news', news.route);
    route.get('/en/news/:id', news.page);
    route.get('/en/:id', pageController);
    route.get('/en/:folder/:page', subPageController);
    //Vi route
    route.get('/vi/du-an', project.route)
    route.get('/vi/tin-tuc', news.route)
    route.get('/vi/du-an/:id', project.page)
    route.get('/vi/tin-tuc/:id', news.page)
    route.get('/vi/:id', pageController);
    route.get('/vi/:folder/:page', subPageController);
    route.get('/sitemap.xml', sitemap)
    //News route
    route.get('/add/news', news.addForm);
    route.post('/add/news', news.add);
    route.get('/edit/news/:id', news.editForm);
    route.post('/edit/news/:id', news.edit);
    route.get('/list/news', news.list);
    //Project route
    route.get('/add/project', project.addForm);
    route.post('/add/project', project.add);
    route.get('/list/project', project.list);
    route.get('/edit/project/:id', project.editForm);
    route.post('/edit/project/:id', project.edit);

    //Login route
    route.get('/login', loginForm);
    route.post('/login', passport.authenticate('local', {
        failureRedirect: '/loginFailed',
        // failureMessage: true
    }), (req, res) => {
        console.log(req.body)
        res.redirect('/loginSuccess');
    });



    return route;
}
const route = createRoutes();

module.exports = route;