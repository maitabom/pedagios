var express = require("express");
var path = require("path");

var app = express();
var view = path.join(__dirname, "./view")
//app.use(express.static("view"));

app.get("/", function (req, res) {
    res.sendFile("index.html", {
        root: view
    });
});

app.listen(8080, () => console.log("O servidor está sendo executado."));