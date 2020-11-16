const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

// bring in the database
const db = require("./config/database");

// test the db
db.authenticate()
	.then(() => console.log("Database connected!"))
	.catch((err) => console.log("Error: " + err));

const app = express();

app.get("/", function (req, res) {
	res.send("INDEX");
});

// Gig routes
app.use("/gigs", require("./routes/gigs"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
