const News = require('./models/news.js');
const utils = require('./utils');
const api = require('./api');

const addForm = (req, res) => {
    res.render('forms/news');
}
const add = (req, res) => {
    const news = new News();
    Object.assign(news, req.body);
    console.log(req.body)
    console.log(news)
    news.save((err) => {
        if (err) throw (err);
        res.redirect('/add/news');
    });
};


const editForm = async (req, res) => {
    const item = await News.findById({
        _id: req.params.id
    });
    console.log(item)
    res.render('edit/news', {
        item
    })
}
const edit = (req, res) => {
    News.findByIdAndUpdate({
        _id: req.params.id
    }, {
        ...req.body
    }, {
        new: true
    }, (err, news) => {
        if (err) console.log(err);
        res.redirect(`/edit/news/${req.params.id}`)
    })
}
const pagination = async (req, res) => {
    //     const perPage = 15;
    //     const allNewss = await news.find({}).sort({
    //         index_number: -1
    //     });
    //     const count = await news.countDocuments();
    // res.render('views/news',{
    //     content : 
    // })
}

const list = async (req, res) => {
    const allNews = await News.find({}).sort({
        _id: -1
    }).lean();
    console.log((allNews[2].tags.join(" ")));
    console.log(typeof (allNews[2].tags.join(" ")));
    res.render('list/news', {
        news: allNews
    });
}

const route = async (req, res) => {
    const news = await News.find({}).sort({
        index_number: -1
    }).lean();
    const options = {
        page: `${req.url.substring(4)}`,
        news,
        ...utils.getUrl(req.url)
    }
    if (req.url === "/vi/du-an") {
        res.render('du-an', options)
    } else {
        res.render('news', options)
    }
}

module.exports = {
    route,
    addForm,
    add,
    list,
    editForm,
    edit,
    pagination
}