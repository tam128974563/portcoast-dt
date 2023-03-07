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
    let options = {
        lang: (req.url.indexOf("/vi/")) ? "en" : "vi",
        page: " ",
        en: " ",
        vi: "trang-chu",
        news: await news(3),
        project: await project(6),
    };
    res.render((req.url.indexOf("/vi/")) ? "index" : "trang-chu", options)
}


module.exports = {
    route
}