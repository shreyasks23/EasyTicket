const express = require('express');

const router = express.Router();


//#region JS routes
router.get('/TicketListJS', function (req, res) {
    res.sendFile(__dirname + "/JS/" + "ticketlist.js");
    
});

router.get('/AddTicketJS', function (req, res) {
    res.sendFile(__dirname + "/JS/" + "addticket.js");
    
});

router.get('/StatsJS', function (req, res) {
    res.sendFile(__dirname + "/JS/" + "statistics.js");    
});

router.get('/AdminJS', function (req, res) {
    res.sendFile(__dirname + "/JS/" + "admin.js");    
});
//#endregion

//#region helperJS routes
router.get('/TabulatorJSHelpers', function (req, res) {
    res.sendFile(__dirname + "/JS/" + "tabulatorhelpers.js");    
});

router.get('/HelperMethods', function (req, res) {
    res.sendFile(__dirname + "/JS/" + "helpers.js");
    
});
//#endregion

module.exports = router;