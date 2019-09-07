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
var waitlist = [

]
console.log(reservations);

//Display home page
//=======================================================================
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

//Display reservation page
//=======================================================================
app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

//View single reservation
//=======================================================================
app.get("/api/tables/:reservation", function (req, res) {
    var chosen = req.params.reservation;
    console.log(chosen)

    for (var i = 0; i < reservations.length; i++) {
        if (chosen === reservations[i].name) {
            return res.json(reservations[i]);
        }
    }
    for (var i = 0; i < waitlist.length; i++) {
        if (chosen === waitlist[i].name) {
            return res.json(waitlist[i]);
        }
    }
    return res.json(false);
});

//Display all Reservations
//=======================================================================
app.get("/api/tables", function (req, res) {
    return res.json(reservations, waitlist);
});

//JSON Input
//=======================================================================
app.post("/api/reserve", function (req, res) {
    var newReservation = req.body;
    newReservation.name = newReservation.name.replace(/\s+/g, "").toLowerCase();
    console.log(newReservation);

    if (reservations.length >= 5) {
        app.post("/api/reserve", function (req, res) {
            var newEntry = req.body;
            newEntry.name = newEntry.name.replace(/\s+/g, "").toLowerCase();
            console.log(newEntry);
            waitlist.push(newEntry);
        })
    }
    else {
        reservations.push(newReservation);
    }
});

res.json(newReservation, newEntry);

//Listening
//=======================================================================
app.listen(PORT, function () {
    console.log("App listening on PORT" + PORT);
});