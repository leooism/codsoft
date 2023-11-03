const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.getUser = catchAsync(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user) throw new AppError("No user found", 202);

	return res.json({
		status: "Sucess",
		user: user.select(
			"-password -passwordChangedAt -passwordConfirm -passwordResetToken"
		),
	});
});

exports.deleteUser = catchAsync(async (req, res) => {
	const { password, _id } = req.body;
	const user = await User.findById(_id);
	if (!user)
		return res.json({ status: "Failed", message: "User doesn't exist" });

	//Compare password
	if (await !user.isPasswordCorrect(password)) {
		return next(new AppError("Password is incorrect", 406));
	}
	//If password match delete password
	// await User.findByIdAndDelete(req.params.id);

	return res.json({
		status: "Sucess",
		message:
			"After 10 days your account will be deleted. Within that time you can reconsider your account",
	});
});
