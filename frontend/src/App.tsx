import React, { useEffect } from "react";
import Home from "./home/Home";
import Jobs from "./jobs/Jobs";

import ErrorPage from "./error/error";
import {
	createBrowserRouter,
	RouterProvider,
	useNavigate,
	useParams,
} from "react-router-dom";
import { useCookies } from "react-cookie";

import { useUserContext } from "./main";
import useSWR from "swr";
import fetcher from "./libs/fetcher";
import Header from "./home/Header";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./@/components/ui/card";
import { Button } from "./@/components/ui/button";
import { MapPinIcon, TimerIcon, Users2, UsersIcon, View } from "lucide-react";
import JobSearch, { jobType } from "./jobs/JobSearch";
import JobApplication from "./dashboard/JobApplication";

import axios from "axios";
import { DashboardLayout } from "./dashboard/DashboardLayout";
import Dashboard from "./dashboard/Dashboard";
import Profile from "./dashboard/Profile";
import { ProtectedRouter } from "./ProtectedRouter";
import { ApplicantsTable } from "./dashboard/ApplicantsTable";

const Job = () => {
	const { id } = useParams();
	const { data, error, isLoading } = useSWR<{
		status: string;
		job: jobType;
	}>(`https://codsoft-backend.vercel.app/job/${id}`, fetcher);
	if (isLoading) return <p>Loading</p>;
	if (data && data.status === "Success")
		return (
			<div className="flex flex-col gap-2">
				<Header />
				<div className="flex items-center justify-center gap-2">
					<Card
						key={data.job._id}
						className="w-full bg-transparent border-gray-400"
					>
						<CardHeader>
							<CardTitle>{data.job.title}</CardTitle>
							<CardDescription className="flex flex-wrap gap-2">
								<div className="border border-gray-500 rounded-lg px-2  py-1 text-sm">
									{data.job.type}
								</div>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit,
								illo?
							</p>
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button className="z-50">Apply</Button>
							<div className="flex items-center gap-3 flex-[0.5] ">
								<span className="flex items-center gap-2">
									<MapPinIcon />
									{data.job.city}
								</span>
								<div className="flex">
									{data.job.urgent && (
										<span className="flex font-semibold text">Urgent</span>
									)}
								</div>
								<div className="flex gap-2">
									<Users2 />{" "}
									<span className="font-semibold">
										{data.job.totalApplicant}
									</span>
								</div>
							</div>
						</CardFooter>
					</Card>
					<Card className=" bg-transparent border-gray-400">
						<CardHeader>
							<CardTitle>Employer Company</CardTitle>
							<CardDescription className="flex flex-wrap flex-col gap-2">
								{data.job.company.name}{" "}
								<div className="border border-gray-500 rounded-lg px-2 w-fit py-1 text-sm flex gap-2">
									{/* {item.type} */}
									<MapPinIcon />
									<span>Navigate Location</span>
								</div>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<h1 className="font-semibold">Job Posted</h1>
							<div className="flex flex-col gap-2 max-h-52 overflow-y-scroll">
								{data.job.company.jobPosted &&
									data.job.company.jobPosted.map((job) => (
										<div className="border flex flex-col p-2 ">
											<h4 className="text-sm">{job.title}</h4>{" "}
											<div className="flex justify-between items-center gap-2">
												<div className="flex gap-2 items-center">
													<TimerIcon width={20} />
													<span className="text-xs">{job.type}</span>
												</div>
												<div className="flex gap-2 items-center">
													<UsersIcon width={20} />
													<span className="text-xs">
														{job.totalApplicant} applications
													</span>
												</div>
											</div>
										</div>
									))}
							</div>
						</CardContent>
						<CardFooter className="flex justify-between">
							<div className="flex gap-2">
								<View />

								<span>89 Views</span>
							</div>{" "}
						</CardFooter>
					</Card>
				</div>
			</div>
		);
};
const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/dashboard",
		element: (
			<ProtectedRouter>
				<DashboardLayout />
			</ProtectedRouter>
		),
		children: [
			{
				path: "/dashboard",
				element: <Dashboard />,
			},
			{
				path: "/dashboard/searchJobs",
				element: <JobSearch />,
			},
			{
				path: "/dashboard/applications",
				element: <JobApplication />,
			},
			{
				path: "/dashboard/setting",
				element: <p>Setting</p>,
			},
			{
				path: "/dashboard/jobPosted",
				element: <p>Job Posted</p>,
			},
			{
				path: "/dashboard/applicants",
				element: <ApplicantsTable />,
			},
			{
				path: "/dashboard/profile",
				element: <Profile />,
			},
		],
	},
	{
		path: "/jobs",
		element: <Jobs />,
		// index: true,
	},
	{
		path: "/jobs/:id",
		element: <Job />,
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
