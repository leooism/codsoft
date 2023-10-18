const mongoose = require("mongoose");
const { Schema } = mongoose;

const JobApplicationSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	deadline: Date,
	user: {
		type: Schema.Types.ObjectId,
		ref: "user",
	},
});

const JobApplication = mongoose.model("jobapplication", JobApplicationSchema);
