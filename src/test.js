const fs = require("fs");
const path = require("path");
const utils = require("./utils.js");
const pages = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/pages.json')));
console.log(pages);