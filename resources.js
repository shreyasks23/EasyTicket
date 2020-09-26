const express = require('express');
const fs = require("fs");

var router = express.Router();


router.get('/HelperMethods', function (req, res) {
    fs.readFile(__dirname + "/JS/" + "helpers.js", 'utf8', function (err, data) {
        res.end(data);
    });
});

router.get('/TicketListJS', function (req, res) {
    fs.readFile(__dirname + "/JS/" + "ticketlist.js", 'utf8', function (err, data) {
        res.end(data);
    });
});

router.get('/AddTicketJS', function (req, res) {
    fs.readFile(__dirname + "/JS/" + "addticket.js", 'utf8', function (err, data) {
        res.end(data);
    });
});

router.get('/StatsJS', function (req, res) {
    fs.readFile(__dirname + "/JS/" + "statistics.js", 'utf8', function (err, data) {
        res.end(data);
    });
});

router.get('/TabulatorJSHelpers', function (req, res) {
    fs.readFile(__dirname + "/JS/" + "tabulatorhelpers.js", 'utf8', function (err, data) {
        res.end(data);
    });
});

module.exports = router;