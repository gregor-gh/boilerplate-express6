var express = require('express');
var app = express();

//console.log("Hello World");

//app.get("/",(req,res)=> res.send("Hello Express"));

// Normal usage
app.use("/public",express.static(__dirname + "/public"));

app.get("/", (req,res) => {
    res.sendFile(__dirname+"/views/index.html");
});
































 module.exports = app;
