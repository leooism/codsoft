const mongoose = require("mongoose");
const { Schema } = mongoose;

const CompanySchema = new Schema({
	logo: {
		type: String,
	},
	name: {
		type: String,
		unique: true,
		required: true,
	},
	jobPosted: [{ type: Schema.Types.ObjectId, ref: "job" }],
	totalViews: {
		type: Number,
		default: 0,
	},
	location: [Number],
	employers: [
		{
			type: Schema.Types.ObjectId,
			ref: "user",
		},
	],
});

const Company = mongoose.model("company", CompanySchema);
module.exports = Company;
