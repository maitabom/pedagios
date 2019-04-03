var express = require("express");
var app = express();

app.use(express.static("view"));

app.get("/", function (req, res) {
    res.send("Olá, mundo!");
});

app.listen(8080);