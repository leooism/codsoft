const userRouter = require("express").Router();
const User = require("../model/User");
const { ObjectId } = require("mongodb");

const {
	login,
	signup,
	isLoggedIn,
	logout,
	secureRoute,
} = require("../controllers/authController");

const { deleteUser, getUser } = require("../controllers/userController");
const AppError = require("../utils/AppError");
const JobApplication = require("../model/JobApplication");
const catchAsync = require("../utils/catchAsync");

userRouter.get(
	"/",
	catchAsync(async (req, res, next) => {
		const data = await User.find().select("-password -passwordConfirm").exec();
		return res.status(200).json({
			status: "Success",
			data,
		});
	})
);

userRouter.post("/login", login).post("/signup", signup);
userRouter.delete("/:id", secureRoute, deleteUser);

userRouter.post("/isLoggedIn", isLoggedIn);

userRouter.get(
	"/appliedJobs",
	catchAsync(async (req, res) => {
		const { userId, recent } = req.query;
		const data = await JobApplication.find({
			user: {
				_id: userId,
			},
		})
			.sort({
				appliedAt: recent ? -1 : 1,
			})
			.limit(recent ? 5 : null)
			.populate({
				path: "job",
			})
			.select("-user")
			.exec();

		if (!data) throw new AppError("No data found", 202);
		res.json({ status: "Success", data });
	})
);
userRouter.post(
	"/applyJob",
	catchAsync(async (req, res, next) => {
		const { jobId, userId } = req.body;
		if (
			await User.findOne({
				_id: userId,
				jobApplied: new ObjectId(jobId),
			})
		)
			return next(new AppError("Already applied", 200));
		const data = await User.findByIdAndUpdate(userId, {
			$push: {
				jobApplied: jobId,
			},
		});
		data.save();
		res.status(201).json({
			status: "Success",
			data,
		});
	})
);
// userRouter.get("/forgotPassword");

// userRouter.get("/resetPassword/:token", async (req, res) => {
// 	const token = req.params.token;

// 	//Check if token is expired

// 	//Compare token

// 	//Update user password

// 	//Upate password changed at
// 	//set password rest token to null
// 	//set password token expire to null
// });
userRouter.get("/logout", logout);

userRouter.get("/:id", getUser);

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

module.exports = userRouter;
