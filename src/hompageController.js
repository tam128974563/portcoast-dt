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
const news = async (limit) => {
    let all = await News.find({}).lean();
    const compareDate = (a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        if (a.month !== b.month) return b.month - a.month;
        if (a.day !== b.day) return b.day - a.day;
    }
    return all.sort(compareDate).slice(0, limit);
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