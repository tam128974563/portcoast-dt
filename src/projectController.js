const Project = require('./models/project');
const utils = require('./utils');
const api = require('./api');

const addForm = (req, res) => {
    res.render('forms/project');
}

const add = (req, res) => {
    console.log(req.body)
    const project = new Project();

    Object.assign(project, req.body);
    console.log(project)

    project.save((err) => {
        if (err) throw (err);
        res.redirect('/add/project');
    });
};


const editForm = async (req, res) => {
    const item = await Project.findById({
        _id: req.params.id
    });
    res.render('edit/project', {
        item
    })
}
const edit = (req, res) => {

    Project.findByIdAndUpdate({
        _id: req.params.id
    }, {
        ...req.body
    }, {
        new: true
    }, (err, project) => {
        if (err) console.log(err);
        res.redirect(`/edit/project/${req.params.id}`)
    })
}
const pagination = async (req, res) => {
    //     const perPage = 15;
    //     const allProjects = await Project.find({}).sort({
    //         index_number: -1
    //     });
    //     const count = await Project.countDocuments();
    // res.render('views/project',{
    //     content : 
    // })
}

const list = async (req, res) => {
    const allProject = await Project.find({}).sort({
        _id: -1
    }).lean();
    console.log((allProject[2].tags.join(" ")));
    console.log(typeof (allProject[2].tags.join(" ")));
    res.render('list/project', {
        project: allProject
    });
}
const page = async (req, res) => {
    const url = req.url.split("/")
    console.log(url)
    const page = await Project.findOne({
        [`url_${url[1]}`]: req.params.id
    }).lean();
    const options = {
        lang: url[1],
        page: url[2],
        en: `projects/${page.url_en}`,
        vi: `du-an/${page.url_vi}`,
    }
    res.render(`${url[2]}/${page[`url_${url[1]}`]}`, options);
}
const route = async (req, res) => {
    const project = await Project.find({}).sort({
        index_number: -1
    }).lean();
    const options = {
        page: `${req.url.substring(4)}`,
        project,
        ...utils.getUrl(req.url)
    }
    if (req.url === "/vi/du-an") {
        res.render('du-an', options)
    } else {
        res.render('projects', options)
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