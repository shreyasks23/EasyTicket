const express = require('express');
const fs = require("fs");

var router = express.Router();

router.get('/Jquery', function (req, res) {
    fs.readFile(__dirname + "/JS" + "/jquery-3.5.1.js", 'utf8', function (err, data) {
        res.end(data);
    });
});

router.get('/BootstrapCSS', function (req, res) {
    fs.readFile(__dirname + "/bootstrap/css/" + "bootstrap.css", 'utf8', function (err, data) {
        res.end(data);
    });
});

router.get('/BootstrapJS', function (req, res) {
    fs.readFile(__dirname + "/bootstrap/js/" + "bootstrap.js", 'utf8', function (err, data) {
        res.end(data);
    });
});

module.exports = router;