const express = require('express');
const bodyParser = require("body-parser");
const fs = require("fs");
const mongoClient = require("mongodb").MongoClient;

const router = express.Router();
const useUnifiedTopology = { useUnifiedTopology: true }

var jsonParser = bodyParser.json({
    type: "application/json"
});


const url = "mongodb://localhost:27017/";




router.post('/AddTicket', jsonParser, (req, res) => {
    let ticket = req.body;
    fs.readFile(__dirname + "/" + "tickets.json", 'utf8', function (err, data) {
        let Tickets = [];
        Tickets = JSON.parse(data);

        let count = Tickets.unshift(ticket);
        console.log(count);

        var jsonString = JSON.stringify(Tickets);
        fs.writeFile(__dirname + "/" + "tickets.json", jsonString, function (err) {
            if (err) throw err;
            console.log('created!');
            res.status('200').send(count.toString());

        });

    });

});

router.post('/CheckTicket', jsonParser, (req, res) => {
    var TicketID = req.body.TicketID;
    let Ticket;
    mongoClient.connect(url, useUnifiedTopology).then((db) => {
        let dbo = db.db("EasyTicket");        
        dbo.collection("Tickets").findOne({ 'TicketID': TicketID },
            { projection: { TicketID : 1 } }).then((data) => {
                Ticket = data;
                if (Ticket) {
                    res.send("1");
                } else {
                    res.send("0");
                }
                //console.log(data);
            })
    }).catch((err) => {
        console.log(err);
    }); 
});

router.get('/AllTickets', (req, res) => {

    mongoClient.connect(url, useUnifiedTopology).then((db) => {
        let dbo = db.db("EasyTicket");
        dbo.collection("Tickets").find().toArray(function (err, result) {
            if (err) { console.log(err) };            
            res.status("200").send(result);            
        });
    }).catch((err) => {
        console.log(err);
    })

});

router.post('/UpdateTicket', jsonParser, (req, res) => {
    let UpdatedTicket = req.body;
    fs.readFile(__dirname + "/" + "tickets.json", 'utf8', function (err, data) {
        let Tickets = [];
        Tickets = JSON.parse(data);
        let index = Tickets.findIndex((v) => { return v.TicketID == UpdatedTicket.TicketID })
        console.log(Tickets[index]);
        Tickets[index] = UpdatedTicket;

        var jsonString = JSON.stringify(Tickets);
        fs.writeFile(__dirname + "/" + "tickets.json", jsonString, function (err) {
            if (err) throw err;
            console.log('Updated!');
            res.status('201').send("Ticket updated");

        });

    });

});

module.exports = router;