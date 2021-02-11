require("dotenv").config();
var express = require('express');
var app = express();

//console.log("Hello World");

//app.get("/",(req,res)=> res.send("Hello Express"));

app.use("/public",express.static(__dirname + "/public"));

app.use("/", (req,res,next) => {
    const method = req.method;
    const ip = req.ip;
    const path = req.path;
    console.log(method + " "+ path + " - " + ip);
    next();
})

app.get("/now",(req,res,next) => {
    req.time = new Date().toString();
    next();
}, (req,res) => {
    res.send({"time": req.time})
})

app.get("/", (req,res) => {
    res.sendFile(__dirname+"/views/index.html");
});


app.get("/json",(req,res) => {
    if (process.env.MESSAGE_STYLE==="uppercase")
        res.json({
            "message": "HELLO JSON"
        })
    else
        res.json({
            "message": "Hello json"
        })
});




























 module.exports = app;
