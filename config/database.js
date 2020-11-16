const Sequelize = require("sequelize");

module.exports = new Sequelize("codegigs_db", "root", "mypasswordis6Str!pes", {
	host: "localhost",
	dialect: "mysql",
	operatorAliases: false,
	pool: {
		max: 5,
		min: 0,
		acquire: 3000,
		idle: 10000,
	},
});
