const {
    Router,
} = require('express');
const utils = require('./utils.js');
const path = require('path');
const pages = [{
    en: " ",
    vi: "trang-chu"
}, {
    en: "about",
    vi: "ve-chung-toi"
}, {
    en: "application",
    vi: "ung-dung"
}, {
    en: "services",
    vi: "dich-vu"
}, {
    en: "projects",
    vi: "du-an"
}, {
    en: "contact",
    vi: "lien-he"
}, {
    en: "frequently-asked-questions",
    vi: "nhung-cau-hoi-thuong-gap-faqs"
}, {
    en: "solutions",
    vi: "giai-phap"
}, {
    en: "",
    vi: ""
}, {
    en: "surveying",
    vi: "khao-sat"
}];
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
    if (req.url.indexOf("en") !== -1) {
        url = {
            lang: "en",
            ...pages.filter(item => item.en === `${req.params.page}`)[0],
            folder: pages.filter(item => item.en === `${req.params.folder}`)[0]
        };
    } else {
        url = {
            lang: "vi",
            ...pages.filter(item => item.vi === `${req.params.page}`)[0],
            folder: pages.filter(item => item.vi === `${req.params.folder}`)[0]
        };
    }
    console.log(url)
    res.render(`${req.params.folder}/${req.params.page}`, {
        dir: path.join(utils.rootPath, '/views/'),
        lang: url.lang,
        page: req.params.folder,
        en: `${url.folder.en}/${url.en}`,
        vi: `${url.folder.vi}/${url.vi}`,
    });
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

    return route;
}
const route = createRoutes();

module.exports = route;