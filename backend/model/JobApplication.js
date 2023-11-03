const mongoose = require("mongoose");
const { Schema } = mongoose;

const JobApplicationSchema = new Schema({
	job: {
		type: Schema.Types.ObjectId,
		ref: "job",
	},
	status: {
		type: String,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "user",
	},
	appliedAt: {
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model("jobapplication", JobApplicationSchema);
