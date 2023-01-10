const News = require('./models/news.js');
const utils = require('./utils');
const api = require('./api');

const addForm = (req, res) => {
    res.render('forms/news');
}

const add = (req, res) => {
    const news = new News();
    Object.assign(news, req.body);

    news.save((err) => {
        if (err) throw (err);
        res.redirect('/add/news');
    })
}


const updateForm = () => {

}
const update = () => {

}

const pagination = () => {

}

const list = () => {

}

const route = () => {

}

module.exports = {
    route,
    addForm,
    add,
    list,
    updateForm,
    update,
}