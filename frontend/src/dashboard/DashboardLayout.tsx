import React, { useRef } from "react";
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
import { Form, Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useUserContext, useDarkMode } from "../main";

import logo from "../assets/logo.svg";
import { PlusIcon, Users2Icon } from "lucide-react";

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
import { useCookies } from "react-cookie";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";

export const DashboardLayout = () => {
	const form = useRef<HTMLFormElement>(null);
	const submitter = useRef<HTMLButtonElement>(null);
	const { pathname } = useLocation();
	const { fullName, role } = useUserContext();
	const [_, removeCookie] = useCookies(["jwt"]);
	const { isDarkMode, toggleDarkMode } = useDarkMode();
	const navigate = useNavigate();

	return (
		<div
			className={`grid grid-cols-[0.25fr_1fr_0.25fr] w-screen h-screen grid-rows-[0.1fr_1fr] items-center ${
				isDarkMode ? "bg-black" : ""
			}`}
		>
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
								<ToastContainer
									position="top-right"
									autoClose={3000}
									hideProgressBar={false}
									newestOnTop={false}
									closeOnClick
									rtl={false}
									pauseOnFocusLoss
									draggable
									pauseOnHover
									theme="light"
								/>
								<DialogTrigger>
									<PlusIcon className="hover:bg-blue-300 rounded-full" />
								</DialogTrigger>
								<DialogContent className="bg-white">
									<DialogHeader>
										<DialogTitle>Post Job</DialogTitle>
									</DialogHeader>
									<Form
										method="post"
										ref={form}
										className="flex flex-col gap-2 "
										onSubmit={async (e) => {
											e.preventDefault();

											const data = new URLSearchParams(
												new FormData(form.current, submitter.current)
											);

											let response = await fetch(
												"https://codsoft-backend.vercel.app/job",
												{
													method: "post",
													body: data,
													credentials: "include",
													mode: "cors",
												}
											);

											response = await response.json();
											response.status === "Success" &&
												toast("Sucessfully Posted", {
													position: "top-right",
													autoClose: 10,
													hideProgressBar: false,
													closeOnClick: true,
													pauseOnHover: false,
													draggable: true,
													progress: undefined,
													theme: "light",
												});
											response.status === "Failed" &&
												toast(response.message, {
													position: "top-right",
													autoClose: 10,
													hideProgressBar: false,
													closeOnClick: true,
													pauseOnHover: false,
													draggable: true,
													progress: undefined,
													theme: "light",
												});
										}}
									>
										<div className="flex flex-col w-full gap-1">
											<Label htmlFor="jt">Job Title</Label>
											<Input
												type="text"
												id="jt"
												placeholder="Enter Job Title"
												name="title"
												required
											/>
										</div>
										<div className="flex  w-full  justify-between ">
											<div className="flex flex-col gap-1 ">
												<Label htmlFor="city">Urgent</Label>
												<Select
													name="urgent"
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
													name="sector"
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
													name="type"
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
													name="totalApplicant"
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

										<Button
											className="w-fit gap-2"
											type="submit"
											ref={submitter}
										>
											<PlusIcon /> Post
										</Button>
									</Form>
								</DialogContent>
							</Dialog>
						)}
					</div>
				</div>
			</div>
			<div className="hidden items-center sm:flex">
				<div className="font-semibold flex">Welcome, {fullName}</div>
				<div className="flex gap-2">
					<SwitchIcon className="w-8 h-8" />
					<LockOpen1Icon
						className="w-8 h-8"
						onClick={async () => {
							await fetch("http:localhost:3000/user/logout", {
								method: "get",
								credentials: "include",
								mode: "cors",
							});
							removeCookie("jwt", "removed", { expires: new Date() });
							navigate("/");
						}}
					/>
				</div>
			</div>
			<div className=" grid md:grid-cols-[0.25fr_1fr] grid-cols-[0.1fr_1fr] w-full h-full row-start-2 row-end-3 col-start-1 col-end-3">
				<div className="flex sm:hidden h-full w-full flex-col  gap-2 rounded-lg shadow-lg p-2">
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
				<div className="sm:flex hidden flex-col gap-2 rounded-lg shadow-lg items-start p-2   ">
					<Link
						to=""
						className="p-2   items-center flex gap-2 w-full text-center hover:bg-blue-600 rounded-2xl hover:text-white font-semibold"
					>
						<DashboardIcon className="w-4 h-4" />
						Dashboard{" "}
					</Link>
					{role.toLowerCase() === "employer" ? (
						<Link
							to="jobposted"
							className="p-2  items-center flex gap-2 w-full text-center hover:bg-blue-600 rounded-2xl hover:text-white font-semibold"
						>
							<BackpackIcon className="w-4 h-4" />
							Job Posted
						</Link>
					) : (
						<Link
							to="searchJobs"
							className="p-2  items-center flex gap-2 w-full text-center hover:bg-blue-600 rounded-2xl hover:text-white font-semibold"
						>
							<ClipboardIcon className="w-4 h-4" />
							Search Jobs
						</Link>
					)}

					{role.toLowerCase() === "employer" ? (
						<Link
							to="applicants"
							className="p-2  items-center flex gap-2 w-full text-center hover:bg-blue-600 rounded-2xl hover:text-white font-semibold"
						>
							<Users2Icon className="w-4 h-4" />
							Applicants
						</Link>
					) : (
						<Link
							to="applications"
							className="p-2  items-center flex gap-2 w-full text-center hover:bg-blue-600 rounded-2xl hover:text-white font-semibold"
						>
							<ClipboardIcon className="w-4 h-4" />
							Applications
						</Link>
					)}
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
					className={` w-full h-full  rounded-lg shadow-2xl p-2 flex-col gap-2`}
				>
					{<Outlet />}
				</div>
			</div>
		</div>
	);
};
