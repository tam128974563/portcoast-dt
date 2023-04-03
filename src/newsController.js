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
    });
};


const editForm = async (req, res) => {
    const item = await News.findById({
        _id: req.params.id
    });
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

    res.render('list/news', {
        news: allNews
    });
}
const page = async (req, res) => {
    const url = req.url.split("/")
    const page = await News.findOne({
        [`url_${url[1]}`]: req.params.id
    }).lean();
    console.log(page)
    console.log(page.sort([
        ["year", 1],
        ["month", 1],
        ["day", 1]
    ]));
    const options = {
        lang: url[1],
        page: url[2],
        en: `news/${page.url_en}`,
        vi: `tin-tuc/${page.url_vi}`,
        news: page,
    }
    res.render(`${url[2]}/${page[`url_${url[1]}`]}`, options);
}
const route = async (req, res) => {
    const news = await News.find({}).sort({
        index_number: -1
    }).lean();
    const compareDate = (a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        if (a.month !== b.month) return b.month - a.month;
        if (a.day !== b.day) return b.day - a.day;
    }
    news.sort(
        compareDate
    );

    const options = {
        page: `${req.url.substring(4)}`,
        news,
        ...utils.getUrl(req.url)
    }
    if (req.url === "/vi/tin-tuc") {
        res.render('tin-tuc', options)
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
    pagination,
    page
}