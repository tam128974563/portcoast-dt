const {
    Router,
} = require('express');
const utils = require('./utils.js');
const path = require('path');
const news = require('./newsController');
const project = require('./projectController');

const pages = require('./data/pages.json');
const homePage = (req, res) => {
    res.render('index', {
        lang: "en",
        page: " ",
        en: " ",
        vi: "trang-chu",
    });
}

const pageController = (req, res) => {
    let url;
    if (req.url.indexOf("en") !== -1) {
        url = {
            lang: "en",
            ...pages.filter(item => item.en === `${req.params.id}`)[0],
        };
    } else {
        url = {
            lang: "vi",
            ...pages.filter(item => item.vi === `${req.params.id}`)[0],
        };
    }
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

const createRoutes = () => {
    const route = Router();
    route.get('/', homePage)
    //Eng route
    route.get('/en', (req, res) => res.redirect('/'));
    route.get('/en/:id', pageController);
    route.get('/en/:folder/:page', subPageController);
    //Vi route
    route.get('/vi/:id', pageController);
    route.get('/vi/:folder/:page', subPageController);
    route.get('/sitemap.xml', sitemap)
    //News route
    route.get('/add/news', news.addForm);
    route.post('/add/news', news.add);
    //Project route
    route.get('/add/project', project.addForm);
    route.post('/add/project', project.add);
    route.get('/list/project', project.list);
    route.get('/edit/project/:id', project.editForm)
    route.post('/edit/project/:id', project.edit)
    route.get('/project', project.route);
    return route;
}
const route = createRoutes();

module.exports = route;