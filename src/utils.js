const path = require('path');

const root = path.dirname(__dirname);
const pages = require('./data/pages.json')
const getUrl = (url) => {
    if (url.indexOf("en") !== -1) {
        return {
            lang: "en",
            ...pages.filter(item => item.en === `${url.substring(4)}`)[0],
        };
    } else {
        return {
            lang: "vi",
            ...pages.filter(item => item.vi === `${url.substring(4)}`)[0],
        };
    }
}

module.exports = {
    rootPath: root,
    getUrl,
}