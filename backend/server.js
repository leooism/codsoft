const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const jobRouter = require("./routes/jobs");
const userRouter = require("./routes/user");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { JobApplication } = require("./model/JobApplication");
require("./model/Company");
require("./model/JobApplication");
const app = express();

app.use(
	cors({
		origin: "http://localhost:5173",
		// methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

// const main = async () => {
// 	await JobApplication.create([
// 		{
// 			job: "652c91fb15a080f64bd60163",
// 			status: "Pending",
// 			appliedAt: new Date(),
// 			user: "652a2a42e61d0aad4ca306a9",
// 		},
// 		{
// 			job: "652c91fb15a080f64bd60164",
// 			status: "Success",
// 			appliedAt: new Date("2023-04-20"),
// 			user: "652a2a42e61d0aad4ca306a9",
// 		},
// 	]);
// };
// // main();
mongoose
	.connect(process.env.MONGO_CONNECT)
	.then((status) => {
		console.log("Connected to mongo db", status.connection.host);
	})
	.catch((err) => {
		// console.log(err);
	});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/job", jobRouter);
app.use("/user", userRouter);
app.get("/user/appliedJobs/:id", async (req, res) => {});
// app.use("*", (req, res, next) => {
// 	const status = 404;
// 	next("NOt found");
// });

app.use("*", (req, res, next) => {
	next(new AppError("Not found", 404));
});
app.use((err, req, res, _) => {
	res.status(err.statusCode || 500).json({
		status: "Failed",
		message: err.message,
	});
});

app.listen(3000, () => {
	console.log("Server is listening");
});
