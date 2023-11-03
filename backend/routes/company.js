const catchAsync = require("../utils/catchAsync");
const Company = require("../model/Company");
const AppError = require("../utils/AppError");
const companyRouter = require("express").Router();

companyRouter.get(
	"/",
	catchAsync(async (req, res, next) => {
		const data = await Company.find();

		return res.status(200).json({
			status: "Success",
			data,
		});
	})
);
companyRouter.get(
	"/:id",
	catchAsync(async (req, res, next) => {
		const id = req.params.id;
		const data = await Company.findById(id);

		return res.status(200).json({
			status: "Success",
			data,
		});
	})
);

companyRouter.post(
	"/",
	catchAsync(async (req, res, next) => {
		const { logo, name, location } = req.body;

		const data = await Company.create({ logo, name, location });

		return res.status(201).json({
			status: "Success",
			data,
		});
	})
);

companyRouter.post(
	"/addEmployers",
	catchAsync(async (req, res, next) => {
		const { employerId, companyId } = req.body;

		const isAlreadyExist = await Company.find({
			_id: companyId,
			employers: employerId,
		});

		if (isAlreadyExist.length === 0) {
			const data = await Company.findByIdAndUpdate(companyId, {
				$push: {
					employers: employerId,
				},
			});

			return res.status(201).json({
				status: "Success",
				// data"
			});
		}
		return next(new AppError("Employer is already added"));
	})
);

companyRouter.patch(
	"/:id",
	catchAsync(async (req, res, next) => {
		const id = req.params.id;
		console.log(req.body);
		const data = await Company.findByIdAndUpdate(id, req.body);

		return res.status(201).json({
			status: "Success",
			data,
		});
	})
);
module.exports = companyRouter;
