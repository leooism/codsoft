import React from "react";
import AreaChart from "./dashboard-charts/AreaChart";
import { JobApplicationTable } from "./JobApplicationTable";
import useSWR from "swr";
import fetcher from "../libs/fetcher";
import { useUserContext } from "../main";
const Dashboard = () => {
	const { _id } = useUserContext();

	const { data, error, isLoading } = useSWR<{
		status: string;
		data: JobApplicationType;
	}>(
		`http://localhost:3000/user/appliedJobs?userId=${_id}&recent=true`,
		fetcher
	);
	if (data && data.status === "Success")
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
					<JobApplicationTable application={data.data} />
				</div>{" "}
			</div>
		);
};

export default Dashboard;
