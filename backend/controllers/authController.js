const jwt = require("jsonwebtoken");
const User = require("../model/User");

//Create signin token
const { promisify } = require("util");

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

exports.login = async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password)
		return res.json({
			status: "Failed",
			message: "Please provide email or password",
		});
	//Check user exist
	const user = await User.findOne({
		email: email,
	});
	if (!user)
		return res.json({ status: "Failed", message: "User doesn't exist" });
	//check password match
	if (!user.isPasswordCorrect(password))
		return res.json({ status: "Failed", message: "Password didn't match" });

	//Successfully log in user
	createSendToken(user, req, res);
};

exports.signup = async (req, res) => {
	const {
		firstName,
		lastName,
		email,
		phoneNumber,
		sectors,
		resume,
		role,
		password,
		passwordConfirm,
	} = req.body;
	const isPasswordMatch = await User.isPasswordMatch(password, passwordConfirm);
	if (!isPasswordMatch)
		return res.json({ status: "Failed", message: "Password didn't match" });

	const user = await User.create({
		firstName,
		lastName,
		email,
		password,
		role,
		sectors,
		phoneNumber,
		resume,
		passwordConfirm,
	});

	createSendToken(user, req, res);
};

exports.logout = async (_, res) => {
	res.cookie("jwt", "just_logged_out", {
		expires: 0,
		httpOnly: true,
	});
	res.json({
		status: "Sucessful",
		message: "Logged out sucessfully",
	});
};

exports.isLoggedIn = async (req, res) => {
	if (req.cookies.jwt)
		try {
			// 1) verify token
			const decoded = await promisify(jwt.verify)(
				req.cookies.jwt,
				process.env.JWT_SECRET_TOKEN
			);
			// 2) Check if user still exists
			const currentUser = await User.findById(decoded.id);
			if (!currentUser) {
				return res.json({
					status: "Failed",
					data: {},
				});
			}

			// THERE IS A LOGGED IN USER

			return res.json({
				status: "Success",
				data: currentUser,
			});
		} catch (err) {
			console.log(err);
			return res.json({
				status: "Failed",
				err,
			});
		}
	return res.json({
		status: "Failed",
		data: {},
	});
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
