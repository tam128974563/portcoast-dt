const mongoose = require('mongoose');
const db = () => {
    mongoose.connect('mongodb://portcoast-dt-read-write:PortcoastDT328%40@localhost:27020/portcoast-dt')
        .then(() => console.log(`MongoDB Connected`))
        .catch(err => console.log(err))
}

module.exports = db;