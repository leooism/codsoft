const userRouter = require("express").Router();
const User = require("../model/User");
const { login, signup, isLoggedIn } = require("../controllers/authController");
const AppError = require("../util/AppError");
const JobApplication = require("../model/JobApplication");
const catchAsync = require("../util/catchAsync");
userRouter.post("/login", login).post("/signup", signup);

userRouter.delete("/:id", async (req, res) => {
	const { password } = req.body;
	const user = await User.findById(req.params.id);
	if (!user)
		return res.json({ status: "Failed", message: "User doesn't exist" });

	//Compare password
	if (await !user.isPasswordCorrect(password)) {
		return res.json({ status: "Failed", message: "Password is incorrect" });
	}
	//If password match delete password
	// await User.findByIdAndDelete(req.params.id);

	return res.json({
		status: "Sucess",
		message:
			"After 10 days your account will be deleted. Within that time you can reconsider your account",
	});
});

userRouter.post("/isLoggedIn", isLoggedIn);

userRouter.get(
	"/appliedJobs",
	catchAsync(async (req, res) => {
		const { userId } = req.query;
		const data = await JobApplication.find({
			user: {
				_id: userId,
			},
		})
			.populate({
				path: "job",
			})
			.select("-user")
			.exec();

		if (!data) throw new AppError("No data found", 202);
		res.json({ status: "Success", data });
	})
);
userRouter.get("/forgotPassword");

userRouter.get("/resetPassword/:token", async (req, res) => {
	const token = req.params.token;

	//Check if token is expired

	//Compare token

	//Update user password

	//Upate password changed at
	//set password rest token to null
	//set password token expire to null
});
userRouter.get("/logout");

userRouter.get(
	"/:id",
	catchAsync(async (req, res) => {
		const user = await User.findById(req.params.id);
		if (!user) throw new AppError("No user found", 202);

		return res.json({
			status: "Sucess",
			user: user.select(
				"-password -passwordChangedAt -passwordConfirm -passwordResetToken"
			),
		});
	})
);

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
