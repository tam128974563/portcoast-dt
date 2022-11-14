const {
    Router,
} = require('express');

// const pages = {
//     "vi": ["trang-chu", "ve-chung-toi", "dich-vu", "ung-dung", "du-an"],
//     "en": ["index", "about", "services", "contact", "projects", "application"]
// };
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
}]
const homePage = (req, res) => {
    res.render('index', {
        lang: "en",
        page: " ",
        en: " ",
        vi: "trang-chu",
    });
}
const enPageController = (req, res) => {
    const url = pages.filter(item => item.en === `${req.params.id}`)[0];
    res.render(`${req.params.id}`, {
        lang: "en",
        page: req.params.id,
        en: url.en,
        vi: url.vi,

    });
}
const viPageController = (req, res) => {
    const url = pages.filter(item => item.vi === `${req.params.id}`)[0];
    res.render(`${req.params.id}`, {
        lang: "vi",
        page: req.params.id,
        en: url.en,
        vi: url.vi,
    });
}

const createRoutes = () => {
    const route = Router();
    route.get('/', homePage)
    route.get('/en', (req, res) => res.redirect('/'));
    route.get('/en/:id', enPageController);
    route.get('/vi/:id', viPageController);

    return route;
}

const route = createRoutes();

module.exports = route;