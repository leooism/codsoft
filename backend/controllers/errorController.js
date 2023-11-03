module.exports = (err, req, res, _) => {
	if (err.message.name === "ValidationError")
		return res.status(400).json({
			status: "Failed",
			message: err.message.message,
		});
		
	return res.status(err.statusCode || 500).json({
		status: "Failed",
		message: err.message,
	});
};
