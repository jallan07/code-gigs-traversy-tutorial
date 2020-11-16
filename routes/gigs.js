const express = require("express");
const router = express.Router();
const db = require("../config/database.js");
const Gig = require("../models/Gig.js");

// get gig list
router.get("/", function (req, res) {
	Gig.findAll()
		.then((gigs) => {
			const context = {
				contextGigs: gigs.map((gig) => {
					return {
						title: gig.title,
						technology: gig.technology,
						budget: gig.budget,
						description: gig.description,
						contact_email: gig.contact_email,
					};
				}),
			};
			res.render("gigs", {
				gigs: context.contextGigs,
			});
		})
		.catch((err) => console.log(err));
});

// display add gig form
router.get("/add", (req, res) => {
	res.render("add");
});

// route to add a gig
router.post("/add", (req, res) => {
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
		title: title,
		technologies: technologies,
		description: description,
		budget: budget,
		contact_email: contact_email,
	})
		.then((gig) => res.redirect("/gigs"))
		.catch((err) => console.log(err));
});

module.exports = router;
