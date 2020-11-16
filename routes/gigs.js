const express = require("express");
const router = express.Router();
const db = require("../config/database.js");
const Gig = require("../models/Gig.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// get gig list
router.get("/", function (req, res) {
	Gig.findAll()
		.then((gigs) => {
			const context = {
				contextGigs: gigs.map((gig) => {
					return {
						title: gig.title,
						technologies: gig.technologies,
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
	let { title, technologies, budget, description, contact_email } = req.body;
	let errors = [];

	// validate fields
	if (!title) {
		errors.push({ text: "Please add a title" });
	}
	if (!technologies) {
		errors.push({ text: "Please add some technologies" });
	}
	if (!description) {
		errors.push({ text: "Please add a description" });
	}
	if (!contact_email) {
		errors.push({ text: "Please add an email address" });
	}

	// check for errors
	if (errors.length > 0) {
		res.render("add", {
			errors,
			title,
			technologies,
			budget,
			description,
			contact_email,
		});
	} else {
		// set budget to unknown if nothing is entered
		if (!budget) {
			budget = "Unkown";
		}
		// add the dollar sign to their budget number
		else {
			budget = `$${budget}`;
		}

		// make lowercase and remove space after comma
		technologies = technologies.toLowerCase().replace(/, /g, ",");

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
	}
});

// search for gigs
router.get("/search", (req, res) => {
	let { term } = req.query;
	// make the search term lowercase
	term = term.toLowerCase();
	// find all matches within the technologies column that contain the term
	Gig.findAll({
		where: {
			technologies: {
				[Op.like]: "%" + term + "%",
			},
		},
	})
		.then((gigs) => {
			const context = {
				contextGigs: gigs.map((gig) => {
					return {
						title: gig.title,
						technologies: gig.technologies,
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

module.exports = router;
