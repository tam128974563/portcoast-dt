const path = require('path');

const root = path.dirname(__dirname);
const pages = require('./data/pages.json')
const getUrl = (url) => {

    if (url.indexOf("/en/") !== -1) {
        console.log(...pages.filter(item => item.en === `${url.substring(4)}`))
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

const clearAccent = (str) => {
    str = str.toLowerCase();
    str.replace(
        /\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g,
        "a");
    str.replace(
        /\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g,
        "o");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    str = str.replace(/\||\/|\.|\-|\|\(|\)|\,|\u0022|\u0027|\u02DD|\u2018|\u2019|\u201A|\u201C|\u201D|\u201E|\u204F|\u003A|\u003B|\u00A6/g, " ");
    str = str.replace(/\ s /g, " ")
    str = str.replace(/\s+/g, " ");
    str = str.trim();
    str = str.replace(/\s/g, "-");
    str = str.toLowerCase();

    return str;
};
const fileGenerate = (type, url_en, url_vi) => {
    if (type === 'news') {
        fs.copyFileSync(path.join(utils.rootPath, '/views/news/template-en.ejs'), path.join(utils.rootPath, `views/news/${url_en}.ejs`));
        fs.copyFileSync(path.join(utils.rootPath, '/views/tin-tuc/template-vi.ejs'), path.join(utils.rootPath, `views/tin-tuc/${url_vi}.ejs`));
        return;
    }
}



module.exports = {
    rootPath: root,
    getUrl,
    clearAccent,
}