const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const jobRouter = require("./routes/jobs");
const userRouter = require("./routes/user");
const app = express();

const Company = require("./model/Company");
const main = async () => {
	await Company.create([
		{
			id: "652c970a7083e4b3eb89869f",
			location: [8.270918, -100.014539],
			logo: "http://placehold.it/32x32",
			name: "Mollit qui duis incididunt laborum aliqua duis anim.",
			jobPosted: ["652c91fb15a080f64bd60163", "652c91fb15a080f64bd60164"],
			totalViews: 292,
		},
		{
			_id: "652c91fb15a080f64bd60164",
			location: [8.270918, -100.014539],
			logo: "http://placehold.it/32x32",
			name: "Mollit qui duis incididunt laborum aliqua duis anim.",
			jobPosted: ["652c91fb15a080f64bd60161", "652c91fb15a080f64bd60162"],
			totalViews: 292,
		},
	]);
};
// main();
mongoose
	.connect(process.env.MONGO_CONNECT)
	.then((status) => {
		console.log("Connected to mongo db", status.connection.host);
	})
	.catch((err) => {
		console.log(err);
	});

app.use(express.json());
app.use("/job", jobRouter);
app.use("/user", userRouter);
app.listen(3000, () => {
	console.log("Server is listening");
});
