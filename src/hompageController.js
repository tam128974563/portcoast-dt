const utils = require('./utils');
const api = require('./api');

const Project = require('./models/project');
const News = require('./models/news.js');

const project = (limit) => {
    return Project.find({
        "selectedIndex": {
            $gte: 0
        }
    }).sort({
        "selectedIndex": -1
    }).limit(limit).lean();

};
const news = (limit) => {
    return News.find({
        "selectedIndex": {
            $te: 0
        }
    }).limit(limit).lean();
}

const route = async (req, res) => {
    const check = req.url.indexOf("/vi/");
    let options = {
        lang: check ? "en" : "vi",
        page: check ? " " : "trang-chu",
        en: " ",
        vi: "trang-chu",
        news: await news(3),
        project: await project(9),
    };

    res.render((req.url.indexOf("/vi/")) ? "index" : "trang-chu", options)
}


module.exports = {
    route
}