const express = require("express");
require("dotenv").config();
const jobRouter = require("./routes/jobs");
const userRouter = require("./routes/user");
const companyRouter = require("./routes/company");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDatabase = require("./utils/connectDatabase");
const errorController = require("./controllers/errorController");
require("./model/Company");
const AppError = require("./utils/AppError");
require("./model/JobApplication");
const app = express();
connectDatabase();

app.use(
	cors({
		origin: "https://codsoft-iota.vercel.app",
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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

app.use("/job", jobRouter);
app.use("/user", userRouter);
app.use("/company", companyRouter);

//Catch all route not handled by above middleware
app.use("*", (req, res, next) => {
	next(new AppError("Not found", 404));
});

//Global error handler

app.use(errorController);

module.exports = app;
