import React from "react";
import AreaChart from "./AreaChart";
import { JobApplicationTable } from "./JobApplicationTable";

const applications = [
	{
		invoice: "INV001",
		paymentStatus: "Paid",
		totalAmount: "$250.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV002",
		paymentStatus: "Pending",
		totalAmount: "$150.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV003",
		paymentStatus: "Unpaid",
		totalAmount: "$350.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV004",
		paymentStatus: "Paid",
		totalAmount: "$450.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV005",
		paymentStatus: "Paid",
		totalAmount: "$550.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV006",
		paymentStatus: "Pending",
		totalAmount: "$200.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV007",
		paymentStatus: "Unpaid",
		totalAmount: "$300.00",
		paymentMethod: "Credit Card",
	},
];
export type JobApplicationTableType = typeof applications;

const Dashboard = () => {
	return (
		<div className="flex flex-col gap-5 items-center justify-center p-2">
			<h1 className="text-2xl font-bold w-full flex  gap-2 justify-start">
				Your <span className="text-blue-400 "> Statstics</span>
			</h1>
			<AreaChart width={6_00} height={300} />
			<div className="flex items-center justify-around w-full">
				<div className="p-2 flex flex-col gap-2 gradient-one items-center justify-center rounded-xl text-white">
					<h1 className="font-bold text-2xl">120</h1>
					<p>Total Applications</p>
				</div>
				<div className="p-2 flex flex-col gap-2 gradient-two items-center justify-center rounded-xl text-white">
					<h1 className="font-bold text-2xl">120</h1>
					<p>Total Applications</p>
				</div>
				<div className="p-2 flex flex-col gap-2 gradient-three text-white items-center justify-center rounded-xl">
					<h1 className="font-bold text-2xl">120</h1>
					<p>Total Applications</p>
				</div>
			</div>
			<div className="flex flex-col gap-4 max-h-[200px] w-full">
				<h1 className="text-2xl font-semibold">Recent Job Applications</h1>
				<JobApplicationTable application={applications.slice(0, 5)} />
			</div>{" "}
		</div>
	);
};

export default Dashboard;
