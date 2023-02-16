const Project = require('./models/project');
const utils = require('./utils');
const api = require('./api');

const addForm = (req, res) => {
    res.render('forms/project');
}

const add = (req, res) => {
    console.log(req.body)
    // const project = new Project();

    // Object.assign(project, req.body);

    // project.save((err) => {
    //     if (err) throw (err);
    //     res.redirect('/add/project');
    // });
};


const updateForm = () => {

}
const update = () => {

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

const list = () => {

}

const route = async (req, res) => {
    const allProjects = await Project.find({}).sort({
        index_number: -1
    });
    console.log(allProjects)
    const count = await Project.countDocuments();
    res.render('projects-clone', {
        content: allProjects,
        count,
        lang: "en",
        page: "",
        vi: "",
        en: "",
        project: allProjects,
    })
}

module.exports = {
    route,
    addForm,
    add,
    list,
    updateForm,
    update,
    pagination
}