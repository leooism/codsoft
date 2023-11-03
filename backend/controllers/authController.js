const jwt = require("jsonwebtoken");
const User = require("../model/User");
const { promisify } = require("util");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
//Create signin token

const signInToken = (id) =>
	jwt.sign({ id }, process.env.JWT_SECRET_TOKEN, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});

//Set singnintoken in cookie and send response
const createSendToken = (user, req, res) => {
	const token = signInToken(user._id);

	//Set expiry date in milliseconds
	res.cookie("jwt", token, {
		expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
		withCredentials: true,
		httpOnly: false,
	});

	user.password = undefined;
	res.json({
		data: {
			token,
			user,
		},
	});
};

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password)
		return next(AppError("Please provide email or password", 400));
	//Check user exist
	const user = await User.findOne({
		email: email,
	});
	if (!user) return next(new AppError("User doesn't exist", 202));
	//check password match
	const isPasswordCorrect = await user.isPasswordCorrect(password);
	console.log(!isPasswordCorrect);
	if (!isPasswordCorrect)
		return next(new AppError("Email or password is incorrect", 400));

	//Successfully log in user
	createSendToken(user, req, res);
});

exports.signup = catchAsync(async (req, res, next) => {
	const {
		firstName,
		lastName,
		email,
		phoneNumber,
		sectors,
		// resume,
		role,
		password,
		passwordConfirm,
	} = req.body;
	const isPasswordMatch = await User.isPasswordMatch(password, passwordConfirm);
	if (!isPasswordMatch) throw new AppError("Password didn't match", 202);

	const user = await User.create({
		firstName,
		lastName,
		email,
		password,
		role,
		sectors,
		// resume,
		phoneNumber: phoneNumber.trim(),
		passwordConfirm,
	});

	createSendToken(user, req, res);
});

exports.logout = catchAsync((req, res, next) => {
	res.cookie("jwt", "loggedout", {
		expires: new Date(),
		withCredentials: true,
		httpOnly: true,
	});
	res.status(200).json({
		status: "Success",
		message: "Loggedout Successfully",
	});
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
	if (req.cookies.jwt) {
		// 1) verify token
		const decoded = await promisify(jwt.verify)(
			req.cookies.jwt,
			process.env.JWT_SECRET_TOKEN
		);
		// 2) Check if user still exists
		const currentUser = await User.findById(decoded.id);
		if (!currentUser) next(new AppError("User doesn't exist", 202));

		// THERE IS A LOGGED IN USER

		return res.json({
			status: "Success",
			data: currentUser,
		});
	}

	next(new AppError("User is not logged in", 401));
});
exports.secureRoute = catchAsync(async (req, res, next) => {
	if (req.cookies.jwt) {
		// 1) verify token
		const decoded = await promisify(jwt.verify)(
			req.cookies.jwt,
			process.env.JWT_SECRET_TOKEN
		);
		// 2) Check if user still exists
		const currentUser = await User.findById(decoded.id);
		if (!currentUser) return next(new AppError("User doesn't exist", 202));

		// THERE IS A LOGGED IN USER
		req.user = currentUser;
		return next();
	}

	return next(new AppError("User must be logged in", 402));
});

exports.restrictTo = (...roles) => {
	return async (req, res, next) => {
		console.log(req.user.role);
		if (!roles.includes(req.user.role))
			return next(new AppError("You are not allowed to post job", 401));
		return next();
	};
};

// exports.forgotPassword = async (req, res) => {
// 	const { email } = req.body;
// 	const user = await User.findOne({ email });

// 	if (!user)
// 		return res.json({ status: "Failed", message: "User doesn't exist" });

// 	//Create reset token
// 	// const resetToken = user.createPasswordResetToken();

// 	// await user.save({ validateBeforeSave: false });

// 	// 3) Send it to user's email
// 	// try {
// 	// 	const resetURL = `${req.protocol}://${req.get(
// 	// 		"host"
// 	// 	)}/api/v1/users/resetPassword/${resetToken}`;
// 	// 	// await new Email(user, resetURL).sendPasswordReset();

// 	// 	res.status(200).json({
// 	// 		status: "success",
// 	// 		message: "Token sent to email!",
// 	// 	});
// 	// } catch (err) {
// 	// 	user.passwordResetToken = undefined;
// 	// 	user.passwordResetExpires = undefined;
// 	// 	await user.save({ validateBeforeSave: false });

// 	// 	return next(
// 	// 		new AppError("There was an error sending the email. Try again later!"),
// 	// 		500
// 	// 	);
// 	// }
// };
