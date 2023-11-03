module.exports = class AppError extends Error {
	statusCode;
	constructor(message, statusCode = 500) {
		super(message);
		this.message = message;
		this.statusCode = statusCode;
		this.isOperational = this.statusCode.toString().startsWith("5")
			? false
			: true;
		// this.stack = this.captureStackTrace();
	}
};
