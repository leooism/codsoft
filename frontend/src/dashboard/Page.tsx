import React from "react";
// import { Button } from "../@/components/ui/button";
import { useState } from "react";
import {
	DashboardIcon,
	SwitchIcon,
	LockOpen1Icon,
} from "@radix-ui/react-icons";
import {
	BackpackIcon,
	ClipboardIcon,
	GearIcon,
	PersonIcon,
	MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../@/components/ui/tabs";
import JobSearch from "../jobs/JobSearch";
import Profile from "./Profile";
import Dashboard from "./Dashboard";
import JobApplication from "./JobApplication";

// import {
// 	Card,
// 	CardContent,
// 	CardDescription,
// 	CardFooter,
// 	CardHeader,
// 	CardTitle,
// } from "../@/components/ui/card";

const Page = () => {
	const [activeTab, setActiveTab] = useState("Dashboard");
	return (
		<div className="grid grid-cols-[0.25fr_1fr_0.25fr] w-screen h-screen grid-rows-[0.1fr_1fr] ">
			<div className=" flex items-center justify-center text-2xl">
				This is logo
			</div>
			<div className="flex gap-10  items-center    flex-1 ">
				<div className="bg-dashboard_button bg-no-repeat w-44 h-20   flex items-center text-white font-semibold justify-center bg-center   ">
					{activeTab}
				</div>
				<div className="flex items-center justify-center gap-2 border rounded-2xl sm:px-2 p-2">
					<MagnifyingGlassIcon className="w-4 h-4" />
					<input
						type="text"
						placeholder="Search"
						className="p-2 outline-none sm:flex hidden"
					/>
				</div>
			</div>
			<div className="hidden gap-2 items-center sm:flex">
				<SwitchIcon className="w-8 h-8" />
				<PersonIcon className="w-8 h-8" />
				<LockOpen1Icon className="w-8 h-8" />
			</div>
			<Tabs
				defaultValue="dashboard"
				className=" grid md:grid-cols-[0.25fr_1fr] grid-cols-[0.1fr_1fr] w-full h-full row-start-2 row-end-3 col-start-1 col-end-3"
				// row-start-2 row-end-[-1] col-start-1 md:col-end-3 col-end-[-1]"
			>
				<TabsList className="flex sm:hidden h-full w-full flex-col  gap-2 rounded-lg shadow-lg p-2 bg-white">
					<TabsTrigger
						value="dashboard"
						onClick={() => setActiveTab("Dashboard")}
					>
						<DashboardIcon className="w-6 h-6" />
					</TabsTrigger>
					<TabsTrigger
						value="searchjobs"
						onClick={() => setActiveTab("Search Jobs")}
					>
						<BackpackIcon className="w-6 h-6" />{" "}
					</TabsTrigger>
					<TabsTrigger
						value="applications"
						onClick={() => setActiveTab("Applications")}
					>
						<ClipboardIcon className="w-6 h-6" />
					</TabsTrigger>
					<TabsTrigger value="profile" onClick={() => setActiveTab("Profile")}>
						{" "}
						<PersonIcon className="w-6 h-6" />
					</TabsTrigger>
					<TabsTrigger value="setting" onClick={() => setActiveTab("Settings")}>
						<GearIcon className="w-6 h-6" />
					</TabsTrigger>
				</TabsList>
				<TabsList className="sm:flex hidden flex-col gap-2 rounded-lg shadow-lg items-start p-2   bg-white ">
					<TabsTrigger
						value="dashboard"
						className="p-2  flex gap-2 w-full text-center hover:bg-blue-600 rounded-2xl hover:text-white font-semibold"
						onClick={() => {
							setActiveTab("Dashboard");
						}}
					>
						<DashboardIcon className="w-4 h-4" />
						Dashboard{" "}
					</TabsTrigger>
					<TabsTrigger
						value="searchjobs"
						className="p-2  flex gap-2 w-full text-center hover:bg-blue-600 rounded-2xl hover:text-white font-semibold"
						onClick={() => {
							setActiveTab("Search Jobs");
						}}
					>
						<BackpackIcon className="w-4 h-4" />
						Search Jobs
					</TabsTrigger>
					<TabsTrigger
						value="applications"
						className="p-2  flex gap-2 w-full text-center hover:bg-blue-600 rounded-2xl hover:text-white font-semibold"
						onClick={() => {
							setActiveTab("Applications");
						}}
					>
						<ClipboardIcon className="w-4 h-4" />
						Applications
					</TabsTrigger>
					<TabsTrigger
						value="profile"
						className="p-2  flex gap-2 w-full text-center hover:bg-blue-600 rounded-2xl hover:text-white font-semibold"
						onClick={() => {
							setActiveTab("Profile");
						}}
					>
						<PersonIcon className="w-4 h-4" />
						Profile
					</TabsTrigger>
					<TabsTrigger
						value="setting"
						className="p-2  flex gap-2 w-full text-center hover:bg-blue-600 rounded-2xl hover:text-white font-semibold"
						onClick={() => setActiveTab("Settings")}
					>
						<GearIcon className="w-4 h-4" />
						Setting
					</TabsTrigger>
				</TabsList>
				<TabsContent
					value="dashboard"
					className={`${
						activeTab === "Dashboard" ? "flex" : "hidden"
					} w-full h-full  rounded-lg shadow-2xl px-10  flex-col gap-2`}
				>
					<Dashboard />
				</TabsContent>
				<TabsContent
					value="searchjobs"
					className={`${
						activeTab === "Search Jobs" ? "flex" : "hidden"
					} w-full h-full  rounded-lg shadow-2xl px-10  flex-col gap-2`}
				>
					<JobSearch />
				</TabsContent>
				<TabsContent
					value="applications"
					className={`${
						activeTab === "Applications" ? "flex" : "hidden"
					} w-full h-full  rounded-lg shadow-2xl px-10  flex-col gap-2`}
				>
					<JobApplication />
				</TabsContent>
				<TabsContent
					value="profile"
					className={`${
						activeTab === "Profile" ? "flex" : "hidden"
					} w-full h-full overflow-y-scroll max-h-screen  rounded-lg shadow-2xl px-10  flex-col gap-2`}
				>
					<Profile />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default Page;
