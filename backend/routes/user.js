const userRouter = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");

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
		httpOnly: true,
	});
	user.password = undefined;
	res.json({
		token,
		data: {
			user,
		},
	});
};

userRouter
	.post("/login", async (req, res) => {
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
	})
	.post("/signup", async (req, res) => {
		const {
			firstName,
			lastName,
			email,
			password,
			passwordConfirm,
			role,
			photo,
		} = req.body;
		const isPasswordMatch = await User.isPasswordMatch(
			password,
			passwordConfirm
		);
		if (!isPasswordMatch)
			return res.json({ status: "Failed", message: "Password didn't match" });

		const user = await User.create({
			firstName,
			lastName,
			email,
			password,
			passwordConfirm,
			role,
			photo,
		});

		createSendToken(user, req, res);
	})
	.post("/:id", async (req, res) => {
		const {} = req.body;
		//Update many -> password, email, fname, lname, photo, resume,
	});

userRouter.delete("/:id", async (req, res) => {
	const { password } = req.body;
	const user = await User.findById(req.params.id);
	if (!user)
		return res.json({ status: "Failed", message: "User doesn't exist" });

	//Compare password
	//If password match delete password

	return res.json({
		status: "Sucess",
		message:
			"After 10 days your account will be deleted. Within that time you can reconsider your account",
	});
});

userRouter.get("/:id", async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user) return res.json({ status: "Failed", message: "User not found" });

	return res.json({
		status: "Sucess",
		user: user.select(
			"-password -passwordChangedAt -passwordConfirm -passwordResetToken"
		),
	});
});

userRouter.get("/forgotPassword", async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });

	if (!user)
		return res.json({ status: "Failed", message: "User doesn't exist" });

	//Create reset token

	//Confirm that email is sent within that email address

	//send email
});

userRouter.get("/resetPassword/:token", async (req, res) => {
	const token = req.params.token;

	//Check if token is expired

	//Compare token

	//Update user password

	//Upate password changed at
	//set password rest token to null
	//set password token expire to null
});
userRouter.get("/logout", async (req, res) => {
	res.cookie("jwt", "just_logged_out", {
		expires: 0,
		httpOnly: true,
	});
	res.json({
		status: "Sucessful",
		message: "Logged out sucessfully",
	});
});

/* 


{
    !protect route (check if token exist) -> no token no loggin , decode token, find the user from the token_id(decode)
    !if not user exist return
    !check if user changed the password after the token was issued
    !grant access
    !req.user= currentUser
    !res.locals.user = 
    !next
}
*/

/* 

!isLoggedin for pages

!authorization
*/
userRouter.post("/company", async (req, res) => {
	console.log("Hi");
	console.log(req.body);
	res.json({
		status: "Sucess",
		message: "Hi",
	});
});
module.exports = userRouter;
