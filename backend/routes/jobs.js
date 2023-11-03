const jobRouter = require("express").Router();
const Job = require("../model/JobListing");

jobRouter.get("/", async (req, res) => {
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
});

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

//alias
jobRouter.get("/recent-jobs", async (req, res) => {
	res.json({
		status: "Test",
	});
});

module.exports = jobRouter;
