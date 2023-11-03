const mongoose = require("mongoose");

module.exports = () =>
	mongoose
		.connect(process.env.MONGO_CONNECT)
		.then((status) => {
			console.log("Connected to mongo db", status.connection.host);
		})
		.catch((err) => {
			// console.log(err);
		});
