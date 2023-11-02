import React from "react";
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
import { Link, Outlet, useLocation } from "react-router-dom";
import useUserContext from "../main";
import logo from "../assets/logo.svg";
import { PlusIcon } from "lucide-react";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../@/components/ui/dialog";
import { Input } from "../@/components/ui/input";
import { Label } from "../@/components/ui/label";
import { Button } from "../@/components/ui/button";
import Select from "react-select";

export const DashboardLayout = () => {
	const { pathname } = useLocation();
	const { fullName, role } = useUserContext();
	return (
		<div className="grid grid-cols-[0.25fr_1fr_0.25fr] w-screen h-screen grid-rows-[0.1fr_1fr] items-center">
			<div className="logo flex-1 ml-2">
				<img src={logo} alt="logo" className=" w-32 h-10 scale-[3]" />
			</div>
			<div className="flex gap-10  items-center    flex-1 ">
				<div className="bg-dashboard_button bg-no-repeat w-44 h-20   flex items-center text-white font-semibold justify-center bg-center   ">
					{pathname.split("/")[
						// eslint-disable-next-line no-unexpected-multiline
						pathname.split("/").length - 1
					].toLocaleUpperCase()}
				</div>
				<div className="flex-1 flex  items-center gap-4 sm:px-2 ">
					<div className="flex items-center justify-center gap-2 border rounded-2xl px-2">
						<MagnifyingGlassIcon className="w-4 h-4" />
						<input
							type="text"
							placeholder="Search"
							className="p-2 outline-none sm:flex hidden"
						/>
					</div>
					<div className="mr-2">
						{role.toLowerCase() === "employer" && (
							<Dialog>
								<DialogTrigger>
									<PlusIcon className="hover:bg-blue-300 rounded-full" />
								</DialogTrigger>
								<DialogContent className="bg-white">
									<DialogHeader>
										<DialogTitle>Post Job</DialogTitle>
									</DialogHeader>
									<form action="" className="flex flex-col gap-2 ">
										<div className="flex flex-col w-full gap-1">
											<Label htmlFor="jt">Job Title</Label>
											<Input
												type="text"
												id="jt"
												placeholder="Enter Job Title"
												name="jobtitle"
												required
											/>
										</div>
										<div className="flex  w-full  justify-between ">
											<div className="flex flex-col gap-1 ">
												<Label htmlFor="city">Urgent</Label>
												<Select
													closeMenuOnSelect={false}
													// defaultValue={[colourOptions[0], colourOptions[1]]}
													options={[
														{
															value: "Yes",
															label: "Yes",
														},
														{
															value: "NO",
															label: "No",
														},
													]}
												/>
											</div>
											<div className="flex flex-col gap-1">
												<Label htmlFor="lname">Sectors </Label>
												<Select
													closeMenuOnSelect={false}
													// defaultValue={[colourOptions[0], colourOptions[1]]}
													isMulti
													options={[
														{
															value: "Web Developer",
															label: "Web Developer",
														},
														{
															value: "Mobile App Developer",
															label: "Mobile App Developer",
														},
														{
															value: "Block Chain Developer",
															label: "Block Chain Developer",
														},
														{
															value: "AI Developer",
															label: "AI Developer",
														},
													]}
													// styles={colourStyles}
												/>
											</div>
											<div className="flex flex-col gap-1">
												<Label htmlFor="type">Type</Label>
												<Select
													closeMenuOnSelect={false}
													// defaultValue={[colourOptions[0], colourOptions[1]]}
													options={[
														{
															value: "Full Time",
															label: "Full Time",
														},
														{
															value: "Internship ",
															label: "Internship",
														},
														{
															value: "Remote Internship",
															label: "Remote Internship",
														},
														{
															value: "Hybrid",
															label: "Hybrid",
														},
													]}
													// styles={colourStyles}
												/>
											</div>
										</div>

										<div className="flex  w-full  gap-2 ">
											<div className="flex flex-col gap-1 ">
												<Label htmlFor="city">City</Label>
												<Input
													type="text"
													id="city"
													placeholder="City"
													name="city"
													required
												/>
											</div>
											<div className="flex flex-col gap-1">
												<Label htmlFor="zip">Zip</Label>
												<Input
													type="number"
													id="zip"
													placeholder="Zip Code"
													name="zip"
													required
												/>
											</div>
											<div className="flex flex-col gap-1">
												<Label htmlFor="totalapplicant">Total Applicant</Label>
												<Input
													type="number"
													id="totalapplicant"
													placeholder="Total Applications"
													name="totalapplicant"
													required
												/>
											</div>
										</div>
										<div className="flex flex-col w-full gap-1">
											<Label htmlFor="company">Company</Label>
											<Input
												type="text"
												id="company"
												placeholder="Enter Company Name"
												name="company"
												required
											/>
										</div>

										<Button className="w-fit gap-2" type="submit">
											<PlusIcon /> Post
										</Button>
									</form>
								</DialogContent>
							</Dialog>
						)}
					</div>
				</div>
			</div>
			<div className="hidden gap-2 items-center sm:flex">
				<div className="font-semibold flex">Welcome, {fullName}</div>
				<SwitchIcon className="w-8 h-8" />
				<LockOpen1Icon className="w-8 h-8" />
			</div>
			<div className=" grid md:grid-cols-[0.25fr_1fr] grid-cols-[0.1fr_1fr] w-full h-full row-start-2 row-end-3 col-start-1 col-end-3">
				<div className="flex sm:hidden h-full w-full flex-col  gap-2 rounded-lg shadow-lg p-2 bg-white">
					<Link to={""}>
						<DashboardIcon className="w-6 h-6" />
					</Link>
					<Link to={"searchjobs"}>
						<BackpackIcon className="w-6 h-6" />{" "}
					</Link>
					<Link to={"applications"}>
						<ClipboardIcon className="w-6 h-6" />
					</Link>
					<Link to={"profile"}>
						<PersonIcon className="w-6 h-6" />
					</Link>
					<Link to={"setting"}>
						<GearIcon className="w-6 h-6" />
					</Link>
				</div>
				<div className="sm:flex hidden flex-col gap-2 rounded-lg shadow-lg items-start p-2   bg-white ">
					<Link
						to=""
						className="p-2   items-center flex gap-2 w-full text-center hover:bg-blue-600 rounded-2xl hover:text-white font-semibold"
					>
						<DashboardIcon className="w-4 h-4" />
						Dashboard{" "}
					</Link>
					<Link
						to="searchjobs"
						className="p-2 items-center  flex gap-2 w-full text-center hover:bg-blue-600 rounded-2xl hover:text-white font-semibold"
					>
						<BackpackIcon className="w-4 h-4" />
						Search Jobs
					</Link>
					<Link
						to="applications"
						className="p-2  items-center flex gap-2 w-full text-center hover:bg-blue-600 rounded-2xl hover:text-white font-semibold"
					>
						<ClipboardIcon className="w-4 h-4" />
						Applications
					</Link>
					<Link
						to="profile"
						className="p-2  items-center flex gap-2 w-full text-center hover:bg-blue-600 rounded-2xl hover:text-white font-semibold"
					>
						<PersonIcon className="w-4 h-4" />
						Profile
					</Link>
					<Link
						to="setting"
						className="p-2  items-center flex gap-2 w-full text-center hover:bg-blue-600 rounded-2xl hover:text-white font-semibold"
					>
						<GearIcon className="w-4 h-4" />
						Setting
					</Link>
				</div>
				<div
					className={` w-full h-full  rounded-lg shadow-2xl px-10  flex-col gap-2`}
				>
					{<Outlet />}
				</div>
			</div>
		</div>
	);
};
