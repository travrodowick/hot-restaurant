//Dependancies
//=======================================================================
var express = require("express");
var path = require("path");

//Express App
//=======================================================================
var app = express();
var PORT = process.env.PORT || 3000;

//Data Parsing
//=======================================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Data (JSON)
//=======================================================================
var reservations = [
    {
        name: "Billy",
        time: "5:30 PM",
        date: "November 28th, 2019",
        phone: "123-456-7891",
    }
]
console.log(reservations);

//Display home page
//=======================================================================
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

//Display all Reservations
//=======================================================================
app.get("/api/tables", function (req, res) {
    return res.json(reservations);
});

//JSON Input
//=======================================================================
app.post("/api/reserve", function (req, res) {
    var newReservation = req.body;
    newReservation.name = newReservation.name.replace(/\s+/g, "").toLowerCase();
    console.log(newReservation);
    reservations.push(newReservation);
    res.json(newReservation);
});

//Listening
//=======================================================================
app.listen(PORT, function () {
    console.log("App listening on PORT" + PORT);
});