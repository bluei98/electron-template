const { ipcMain } = require('electron');
const request = require('request');
const cheerio = require("cheerio");

module.exports.info = function() {
    return "Utils Module";
};

module.exports.request = function (opt, fncCallback) {
    const request = require('request');
    request(opt, fncCallback);
}