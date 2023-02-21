const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    title_en: String,
    title_vi: String,
    url_en: String,
    url_vi: String,
    folder: String,
    location_en: String,
    location_vi: String,
    tags: Array,
    button: Array,
    index: String,
});
module.exports = mongoose.model('Project', ProjectSchema, 'Project');