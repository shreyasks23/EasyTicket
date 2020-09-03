//Module imports
const express = require('express');
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");

//importing bootstrap and jquery files
const resources = require("./resources");



const app = express();

var jsonParser = bodyParser.json({
    type: "application/json"
});

app.use(express.static(__dirname + '/bootstrap'));

app.use("/resources", resources);

//#region Routes

app.post('/CheckTicket', jsonParser, (req, res) => {
    var TicketID = req.body.TicketID;
    fs.readFile(__dirname + "/" + "tickets.json", 'utf8', function (err, data) {
        let Tickets = [];
        Tickets = JSON.parse(data);
        let TicketFound = false;
        for (let i = 0; i < Tickets.length; i++) {
            if (Tickets[i].TicketID == TicketID) {
                TicketFound = true;
            }            
        }
        if (TicketFound) {
            console.log("ticket already present");
            res.end("1");
        }
        else {
            console.log("please create ticket");
            res.end("0");
        }
    });
});

app.post('/AddTicket', jsonParser, (req, res) => {
    let ticket = req.body;
    fs.readFile(__dirname + "/" + "tickets.json", 'utf8', function (err, data) {
        let Tickets = [];
        Tickets = JSON.parse(data);

        Tickets.push(ticket);
        var jsonString = JSON.stringify(Tickets);
        fs.writeFile(__dirname + "/" + "tickets.json", jsonString, function (err) {
            if (err) throw err;
            console.log('created!');
            res.end("0");
        });

    });
    //res.send(Tickets);
});

app.get('/', function (req, res) {
    fs.readFile(__dirname + "/" + "index.html", 'utf8', function (err, data) {
        res.end(data);
    });
});

app.get('/Index', function (req, res) {
    fs.readFile(__dirname + "/" + "index.html", 'utf8', function (err, data) {
        res.end(data);
    });
});

app.get('/GetAllTickets', function (req, res) {
    fs.readFile(__dirname + "/" + "ticketlist.html", 'utf8', function (err, data) {
        res.end(data);
    });
});


app.get('/mainJS', function (req, res) {
    fs.readFile(__dirname + "/JS/" + "common.js", 'utf8', function (err, data) {
        res.end(data);
    });
});

app.get('/AllTickets', function (req, res) {
    fs.readFile(__dirname + "/" + "tickets.json", 'utf8', function (err, data) {
        var Tickets = [];
        Tickets = JSON.parse(data);
        res.send(Tickets);
    });
});

//#endregion

//server initialization
const server = app.listen(8081, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log("Example app listening at http://Localhost:%s", port);
});