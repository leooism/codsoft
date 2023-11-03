const AppError = require("./AppError");
module.exports = (fn) => (req, res, next) =>
	fn(req, res, next).catch((err) => next(new AppError(err)));
