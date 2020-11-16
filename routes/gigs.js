const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Gig = require("../models/Gig");

// get gig list
router.get("/", function (req, res) {
	Gig.findAll()
		.then((gigs) => {
			console.log(gigs);
			res.sendStatus(200);
		})
		.catch((err) => console.log(err));
});

// route to add a gig
router.get("/add", (req, res) => {
	const data = {
		title: "Simple Wordpress website",
		technologies: "Wordpress, php, html, css",
		budget: "$$1000",
		description:
			"Once you learn the technique, ohhh! Turn you loose on the world; you become a tiger. In your imagination you can go anywhere you want. We need dark in order to show light. Let's build an almighty mountain. Don't fight it, use what happens. You have freedom here. The only guide is your heart.",
		contact_email: "user2@gmail.com",
	};

	let { title, technologies, budget, description, contact_email } = data;

	// insert into table
	Gig.create({
		title,
		technologies,
		description,
		budget,
		contact_email,
	})
		.then((gig) => res.redirect("/gigs"))
		.catch((err) => console.log(err));
});

module.exports = router;
