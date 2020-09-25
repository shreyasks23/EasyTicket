//Module imports
const express = require('express');
const bodyParser = require("body-parser");


//importing required js files
const resources = require("./resources");
const apis = require("./apis");


//app intialization
const app = express();

var jsonParser = bodyParser.json({
    type: "application/json"
});

app.use(express.static(__dirname + '/public'));

app.use("/resources", resources);
app.use("/apis", apis);



app.post('/InsertToMongo', jsonParser, (req, res) => {
    var myobj = req.body;
    
    mongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("EasyTicket");
        //var myobj = { name: name, age : age };
        dbo.collection("Tickets").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
    res.status("200").send("added");
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views" + "/statistics.html");
   
});

app.get('/TicketList', (req, res) => {
    res.sendFile(__dirname + "/views" + "/ticketlist.html");
   
});

app.get('/Index',  (req, res) => {
    res.sendFile(__dirname + "/views" + "/statistics.html");
    
});

app.get('/AddTicket',  (req, res) =>{
    res.sendFile(__dirname + "/views" + "/addticket.html");
    
});


//server initialization
const server = app.listen(8081, function () {    
    const port = server.address().port;
    console.log("Example app listening at http://Localhost:%s", port);
});