var express = require("express");
var path = require("path");

var app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function (req, res) {
    res.render("index", {
        teste: "Fabio Valentim"
    });
});

app.post("/", function (req, res) {});

app.listen(8080, () => console.log("O servidor está sendo executado."));