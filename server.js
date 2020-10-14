//Module imports
const express = require('express');
const bodyParser = require("body-parser");


//importing required js files
const resources = require("./resources");
const apis = require("./apis");


//app intialization
const app = express();

app.use(express.static(__dirname + '/public'));

app.use("/resources", resources);
app.use("/apis", apis);


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

app.get('/Admin',  (req, res) =>{
    res.sendFile(__dirname + "/views" + "/admin.html");
    
});
app.get('/StatsV1',  (req, res) =>{
    res.sendFile(__dirname + "/views" + "/statisticsV1.html");    
});

//server initialization
const server = app.listen(8081, function () {    
    const port = server.address().port;
    console.log("Example app listening at http://Localhost:%s", port);
});