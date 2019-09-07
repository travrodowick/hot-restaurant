var express = require("express")
var path = require("path")

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(_dirname, "home.html"))
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(_dirname, "tables.html"))
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(_dirname, "reserve.html"))
})

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});