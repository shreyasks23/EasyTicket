const express = require('express');


const router = express.Router();


router.get('/HelperMethods', function (req, res) {
    res.sendFile(__dirname + "/JS/" + "helpers.js");
    
});

router.get('/TicketListJS', function (req, res) {
    res.sendFile(__dirname + "/JS/" + "ticketlist.js");
    
});

router.get('/AddTicketJS', function (req, res) {
    res.sendFile(__dirname + "/JS/" + "addticket.js");
    
});

router.get('/StatsJS', function (req, res) {
    res.sendFile(__dirname + "/JS/" + "statistics.js");
    
});

router.get('/TabulatorJSHelpers', function (req, res) {
    res.sendFile(__dirname + "/JS/" + "tabulatorhelpers.js");    
});

module.exports = router;