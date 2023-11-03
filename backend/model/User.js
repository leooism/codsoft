const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const crypto = require("crypto");
const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: [true, "Please enter your first name"],
		},

		lastName: {
			type: String,
			requried: [true, "Please enter your last name"],
		},

		email: {
			type: String,
			unique: true,
			lowercase: true,
			required: [true, "Please provide your email address"],
		},
		photo: {
			type: String,
		},
		role: {
			type: String,
			enum: ["candidate", "employer", "admin"],
			defafult: "candidate",
		},

		password: {
			type: String,
			require: [true, "Please provide a password"],
		},
		passwordConfirm: {
			type: String,
			required: [true, "Please confirm your password"],
			validate: {
				validator: function (cpsw) {
					return this.password === cpsw;
				},
				message: "Password didn't match",
			},
		},
		// passwordChangedAt: Date,
		// passwordResetToken: String,
		// passwordResetExpire: Date,
		views: {
			type: Number,
			default: 0,
		},
		jobApplied: [{ ref: "job", type: Schema.Types.ObjectId }],
	},
	{
		virtuals: {
			fullName: {
				get() {
					return this.firstName + " " + this.lastName;
				},
			},
		},
	}
);

//Before the user is created, the password is crypted and then passwordConfirm is set to undefined
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;
	next();
});

//Static method
userSchema.statics = {
	isPasswordMatch(p1, p2) {
		return p1 === p2;
	},
};

//Instance method
userSchema.methods.isPasswordCorrect = async function (candidatePassword) {
	return await bcrypt.compare(candidatePassword, this.password);
};

// userSchema.methods.generateResetPasswordTOken = function () {
// 	//Reset token
// 	const resetToken = crypto.randomBytes(32).toString("hex");
// 	//set reset token to user
// 	this.passwordResetToken = crypto
// 		.createHash("sha256")
// 		.update(resetToken)
// 		.digest("hex");
// 	//set password expiresat
// 	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
// 	//snd token
// 	return resetToken;

// 	// console.log({ resetToken }, this.passwordResetToken);
// };

const User = mongoose.model("user", userSchema);
module.exports = User;
