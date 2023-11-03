const jobRouter = require("express").Router();
const { secureRoute, restrictTo } = require("../controllers/authController");
const Company = require("../model/Company");
const Job = require("../model/JobListing");
const catchAsync = require("../utils/catchAsync");

jobRouter.get(
	"/",
	catchAsync(async (req, res) => {
		const queryParams = req.query;
		const selectedFields = { ...queryParams };
		["page", "limit"].forEach((key) => delete selectedFields[key]);

		const jobs = await Job.find(selectedFields)
			.skip(queryParams.page ? queryParams - 1 : 0)
			.limit(queryParams.limit ? queryParams.limit : 0)
			.populate({
				path: "company",
				populate: {
					path: "jobPosted",
					model: "job",
				},
			})
			.exec();
		res.json({
			status: "Success",
			length: jobs.length,
			jobs,
		});
	})
);

jobRouter.post(
	"/",
	secureRoute,
	restrictTo("Employer"),
	catchAsync(async (req, res, next) => {
		const {
			urgent,
			title,
			sector,
			type,
			totalApplicant,
			city,
			zip,
			company: companyName,
		} = req.body;

		const company = await Company.findOneAndUpdate(
			{
				name: companyName,
			},
			{
				$set: {
					name: companyName,
				},
			},
			{
				upsert: true,
			}
		);

		const job = await Job.create({
			urgent: urgent === "Yes" ? true : false,
			title,
			sector,
			type,
			totalApplicant: +totalApplicant,
			city,
			zip,
			company: company._id,
		});
		company.jobPosted.push(job._id);
		company.save();

		res.status(201).json({
			status: "Success",
			data: job,
		});
	})
);
jobRouter.get("/:id", async (req, res) => {
	const jobId = req.params.id;
	if (!jobId) return;
	//Nested Population
	const job = await Job.findById(jobId)
		.populate({
			path: "company",
			populate: {
				path: "jobPosted",
				model: "job",
			},
		})
		.exec();
	if (!job)
		return res.json({ status: "Failed", message: "No job found with this id" });

	res.json({
		status: "Success",
		job,
	});
});

jobRouter.delete(
	"/:id",
	catchAsync(async (req, res, next) => {
		const data = await Company.findByIdAndDelete(req.params.id);
		res.status(200).json({
			status: "Success",
			data,
		});
	})
);
//alias
jobRouter.get("/recent-jobs", async (req, res) => {
	res.json({
		status: "Test",
	});
});

module.exports = jobRouter;
