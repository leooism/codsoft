const jobRouter = require("express").Router();
const Job = require("../model/JobListing");

jobRouter.get("/", async (req, res) => {
	const queryParams = req.query;
	const selectedFields = { ...queryParams };
	["page", "limit"].forEach((key) => delete selectedFields[key]);

	const jobs = await Job.find(selectedFields)
		.skip(queryParams.page ? queryParams - 1 : 0)
		.limit(queryParams.limit ? queryParams.limit : 0)
		.populate("company")
		.exec();
	res.json({
		status: "Sucess",
		length: jobs.length,
		jobs,
	});
});

jobRouter.get("/:id", async (req, res) => {
	const jobId = req.params.id;
	if (!jobId) return;
	const job = await Job.findById(jobId);
	if (!job)
		return res.json({ status: "Failed", message: "No job found with this id" });

	res.json({
		status: "Sucessful",
		job,
	});
});

module.exports = jobRouter;
