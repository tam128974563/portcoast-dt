const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    name: String,
    user: {
        type: String,
        require: true,
        
    }
});
module.exports = mongoose.model('News', NewsSchema, 'news');