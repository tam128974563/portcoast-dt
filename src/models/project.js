const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    title_en: String,
    title_vi: String,
    url_en: String,
    url_vi: String,
    folder: String,
    date_en: String,
    date_vi: String,
    description_en: String,
    description_vi: String,
    original_url: String,
    index: String,
});
module.exports = mongoose.model('Project', ProjectSchema, 'Project');