const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    title_en: String,
    title_vi: String,
    url_en: String,
    url_vi: String,
    folder: String,
    day: String,
    month: String,
    year: String,
    description_en: String,
    description_vi: String,
    tag: String,
    original_url: String,
    index: String,
});
module.exports = mongoose.model('News', NewsSchema, 'news');