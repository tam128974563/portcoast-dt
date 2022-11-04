const {
    Router,
} = require('express');

const pages = {
    "vi": ["trang-chu", "ve-chung-toi", "dich-vu", "ung-dung", "du-an"],
    "en": ["index", "about", "services", "contact", "projects", "application"]
};

const pageController = (req, res) => {
    let lang;
    if (pages.en.includes(req.params.id)) {
        lang = "en";
    }
    res.render(`${req.params.id}`, {
        lang,
    });
}

const createRoutes = () => {
    const route = Router();
    route.get('/:id', pageController);

    return route;
}

const route = createRoutes();

module.exports = route;