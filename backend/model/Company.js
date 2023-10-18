const mongoose = require("mongoose");
const { Schema } = mongoose;

const CompanySchema = new Schema({
	logo: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	jobPosted: [{ type: Schema.Types.ObjectId, ref: "job" }],
	totalViews: {
		type: Number,
		default: 0,
	},
	location: [Number],
});

const Company = mongoose.model("company", CompanySchema);
module.exports = Company;
