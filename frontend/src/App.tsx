import React from "react";
import Home from "./home/Home";
import Jobs from "./jobs/Jobs";
import ErrorPage from "./error/error";
import JobSearch from "./jobs/JobSearch";
import JobApplication from "./dashboard/JobApplication";
import { DashboardLayout } from "./dashboard/DashboardLayout";
import Dashboard from "./dashboard/Dashboard";
import Profile from "./dashboard/Profile";
import { ProtectedRouter } from "./ProtectedRouter";
import { ApplicantsTable } from "./dashboard/ApplicantsTable";
import { DarkModeProvider } from "./store/DarkContext";
import { Job } from "./jobs/Job";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/dashboard",
		element: (
			<DarkModeProvider>
				<ProtectedRouter>
					<DashboardLayout />
				</ProtectedRouter>
			</DarkModeProvider>
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
