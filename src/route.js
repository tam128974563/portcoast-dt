const {
    Router,
} = require('express');

const pages = {
    "vi": ["trang-chu", "ve-chung-toi", "dich-vu", "ung-dung", "du-an"],
    "en": ["index", "about", "services", "contact", "projects", "application"]
};
const homePage = (req, res) => {
    res.render('index', {
        lang: "en",
        page: "index",
    });
}
const enPageController = (req, res) => {
    res.render(`${req.params.id}`, {
        lang: "en",
        page: req.params.id,

    });
}
const viPageController = (req, res) => {
    res.render(`${req.params.id}`, {
        lang: "vi",
        page: req.params.id,

    });
}

const createRoutes = () => {
    const route = Router();
    route.get('/', homePage)
    route.get('/en/:id', enPageController);
    route.get('/vi/:id', viPageController);

    return route;
}

const route = createRoutes();

module.exports = route;