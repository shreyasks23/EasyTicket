const express = require('express');
const bodyParser = require("body-parser");
const mongoClient = require("mongodb").MongoClient;

const router = express.Router();
const useUnifiedTopology = { useUnifiedTopology: true };

var jsonParser = bodyParser.json({
    type: "application/json"
});


const url = "mongodb://localhost:27017/";


router.post('/AddTicket', jsonParser, (req, res) => {
    let ticket = req.body;

    mongoClient.connect(url, useUnifiedTopology).then((db) => {
        let dbo = db.db("EasyTicket");
        dbo.collection("Tickets").insertOne(ticket, function (err, result) {
            if (err) { console.log(err) };
            console.log("1 document inserted");
            db.close();
            res.sendStatus("200");
        });
    }).catch((err) => {
        console.log(err);
    })

});

router.post('/CheckTicket', jsonParser, (req, res) => {
    var TicketID = req.body.TicketID;
    let Ticket;
    mongoClient.connect(url, useUnifiedTopology).then((db) => {
        let dbo = db.db("EasyTicket");
        dbo.collection("Tickets").findOne({ 'TicketID': TicketID },
            { projection: { TicketID: 1 } }).then((data) => {
                Ticket = data;
                if (Ticket) {
                    res.end("1");
                } else {
                    res.end("0");
                }                
            });
    }).catch((err) => {
        console.log(err);
    });
});

router.get('/AllTickets', (req, res) => {

    mongoClient.connect(url, useUnifiedTopology).then((db) => {
        let dbo = db.db("EasyTicket");
        dbo.collection("Tickets").find().sort({"_id" : -1}).toArray(function (err, result) {
            if (err) { console.log(err) };
            res.status("200").send(result);
        });
    }).catch((err) => {
        console.log(err);
    })

});

router.post('/UpdateTicket', jsonParser, (req, res) => {
    let UpdatedTicket = req.body;
    let TicketToUpdate = {
        $set: {
            Subject: UpdatedTicket.Subject,
            RecievedDate: UpdatedTicket.RecievedDate,
            ResolvedDate: UpdatedTicket.ResolvedDate,
            Status: UpdatedTicket.Status,
            TicketType: UpdatedTicket.TicketType,
            Priority: UpdatedTicket.Priority,
            Severity: UpdatedTicket.Severity,
            HandledBy: UpdatedTicket.HandledBy,
            ResolutionTime: UpdatedTicket.ResolutionTime
        }
    }
    mongoClient.connect(url, useUnifiedTopology).then((db) => {
        let dbo = db.db("EasyTicket");
        dbo.collection("Tickets").updateOne(
            { 'TicketID': UpdatedTicket.TicketID },
            TicketToUpdate).then((data) => {                
                res.status('201').send("Ticket updated");
            }).catch((err) => console.log(err));
    }).catch((err) => console.log(err));
   

});

module.exports = router;