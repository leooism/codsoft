const mongoose = require("mongoose");
const { Schema } = mongoose;

const sectorEnum = [
	"Web Development",
	"Mobile Development",
	"Data Science",
	"Artificial Intelligence",
	"Cloud Computing",
	"Cybersecurity",
];
const jobListingSchema = new Schema({
	urgent: {
		type: Boolean,
		required: true,
	},
	title: {
		type: String,
		required: [true, "Job must have a title"],
	},
	sector: [
		{
			type: String,
			required: [true, "Sector must be selected"],
		},
	],
	type: {
		type: String,
		required: true,
	},
	totalApplicant: {
		type: Number,
		required: true,
		default: 0,
	},
	city: {
		type: String,
	},
	zip: {
		type: Number,
	},
	company: {
		type: Schema.Types.ObjectId,
		ref: "company",
	},
});

const Job = mongoose.model("job", jobListingSchema);
module.exports = Job;

/* 


{
    title: {
        type: String, 
        required: true
    }, 
    status: {
        type: String, 
        required: true
    }, 
    deadline: Date, 

}

*/
