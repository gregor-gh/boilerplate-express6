require("dotenv").config();
const bodyParser = require("body-parser");
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

app.use(bodyParser.urlencoded({extended:false}));
//app.use(bodyParser.json());

app.get("/now",(req,res,next) => {
    req.time = new Date().toString();
    next();
}, (req,res) => {
    res.send({time: req.time});
});

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

app.get("/:word/echo", (req,res) => {
    res.send({echo: req.params.word})
});

app.route("/name")
    .get((req,res,next) => {
        req.fullname = req.query.first+" "+req.query.last
        res.json({name: req.fullname})
    })
    .post((req,res) => {
        res.json({name: req.body.first+ " "+ req.body.last})
    })
























 module.exports = app;
