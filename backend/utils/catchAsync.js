const AppError = require("./AppError");
module.exports = (fn) => async (req, res, next) =>
	fn(req, res, next).catch((err) => {
		console.log("Error------------------<");
		console.log(err);
		if (err.name === "MongoServerError")
			return next(new AppError(err.message, 400));
		// console.log(err.instanceOf("MongoServerError"))
		return next(new AppError(err.message));
	});
