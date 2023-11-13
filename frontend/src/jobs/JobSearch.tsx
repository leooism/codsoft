import React, { useRef, useState, useEffect } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../@/components/ui/select";
import { Button } from "../@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../@/components/ui/card";
import { Checkbox } from "../@/components/ui/checkbox";

import { MapPinIcon, Users2, RotateCcw as RefreshIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserContext } from "../store/UserContext";

import { ToastContainer } from "react-toastify";
import API_URL from "../constant/APIURL";

// --------------------------------->
export type jobType = {
	_id: string;
	urgent: boolean;
	title: string;
	jobDescription?: string;
	company: {
		_id: string;
		logo: string;
		name: string;
		totalViews: number;
		jobPosted: jobType[];
		location: number[];
	};
	sector: string[];
	totalApplicant: number;
	type: string;
	zip: number;
	city: string;
};
export type responseType = {
	status: string;
	length: number;
	jobs: jobType[];
};

//------------------------------------------------------->
const JobSearch = () => {
	const [title, setTitle] = useState("");
	const [sector, setSector] = useState("");
	const [zip, setZip] = useState("");
	const [city, setCity] = useState("");
	const formRef = useRef<HTMLFormElement>(null);
	const submitter = useRef(null);
	const [jobs, setJobs] = useState([]);
	const [fetchData, setFetchData] = useState(true);
	const { _id: userId } = useUserContext();

	useEffect(() => {
		async function fetchJob() {
			const response = await fetch(`${API_URL}/job`);
			const data = await response.json();
			if (data.status === "Success") setJobs(data.jobs);
		}
		if (fetchData) fetchJob();
		setFetchData(false);
	}, [fetchData]);
	return (
		<div className="flex flex-col gap-5">
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
			<form
				ref={formRef}
				className="items-center flex justify-center w-full flex-col gap-2"
				onSubmit={(e) => {
					e.preventDefault();
					setJobs((prevJobs) =>
						prevJobs.filter(
							(job) =>
								job.title.toLowerCase() === title.toLowerCase() ||
								job.city.toLowerCase() === city.toLowerCase() ||
								job.zip === +zip ||
								job.sector.includes(sector.toLowerCase())
						)
					);
					setTitle("");
					setCity("");
					setZip("");
					setSector("");
				}}
			>
				<div className=" gap-3 hidden sm:flex ">
					<Select
						name="sector"
						value={sector}
						onChange={(e) => setSector(e.target.value)}
					>
						<SelectTrigger className="w-[180px] rounded-2xl">
							<SelectValue placeholder="Job Type" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="full-time">Full Time</SelectItem>
								<SelectItem value="remote">Remote</SelectItem>
								<SelectItem value="internship">Internship</SelectItem>
								<SelectItem value="remote-internsip">
									Remote Internship
								</SelectItem>
								<SelectItem value="part-time">Part Time</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<input
						value={city}
						onChange={(e) => setCity(e.target.value)}
						type="text"
						placeholder="City"
						name="city"
						className="border border-gray-300 rounded-2xl p-2 w-32 outline-none"
					/>
					<input
						value={zip}
						onChange={(e) => setZip(e.target.value)}
						type="text"
						name="zip"
						placeholder="Zip Code"
						className="border border-gray-300 rounded-2xl p-2 w-32 outline-none"
					/>
					<input
						name="sector"
						type="text"
						placeholder="Sector"
						value={sector}
						onChange={(e) => setSector(e.target.value)}
						className="border border-gray-300 rounded-2xl p-2 w-32 outline-none"
					/>
				</div>
				<div className="flex p-4 gap-2 rounded-2xl bg-white shadow-2xl  ">
					<input
						type="text"
						placeholder="Search Jobs"
						className="bg-transparent outline-none border-none"
						name="jobtitle"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<Button className="bg-blue-500" type="submit" ref={submitter}>
						Search
					</Button>
					<Button className="bg-blue-300" onClick={() => setFetchData(true)}>
						<RefreshIcon />
					</Button>
				</div>
			</form>
			<div className="flex gap-2 w-full items-start justify-center">
				<div className="flex flex-col gap-2 flex-[0.6]">
					{jobs.length > 0 &&
						jobs.map((item) => (
							<Link to={`/jobs/${item._id}`}>
								<Card
									key={item._id}
									className="w-full bg-transparent border-gray-400"
								>
									<CardHeader>
										<CardTitle>{item.title}</CardTitle>
										<CardDescription className="flex flex-wrap gap-2">
											<div className="border border-gray-500 rounded-lg px-2  py-1 text-sm">
												{item.type}
											</div>
										</CardDescription>
									</CardHeader>
									<CardContent>
										<p>
											Lorem, ipsum dolor sit amet consectetur adipisicing elit.
											Velit, illo?
										</p>
									</CardContent>
									<CardFooter className="flex justify-between">
										<Button
											className="z-50"
											onClick={async (e) => {
												e.preventDefault();
												const response = await fetch(
													"${API_URL}/user/applyJob",
													{
														method: "post",
														credentials: "include",
														headers: {
															"Content-Type": "application/json",
														},
														body: JSON.stringify({ jobId: item._id, userId }),
													}
												);
												const data = await response.json();
											}}
										>
											Apply
										</Button>
										<div className="flex items-center gap-3 flex-[0.5] ">
											<span className="flex items-center gap-2">
												<MapPinIcon />
												{item.city}
											</span>
											<div className="flex">
												{item.urgent && (
													<span className="flex font-semibold text">
														Urgent
													</span>
												)}
											</div>
											<div className="flex gap-2">
												<Users2 />{" "}
												<span className="font-semibold">
													{item.totalApplicant}
												</span>
											</div>
										</div>
									</CardFooter>
								</Card>
							</Link>
						))}
					{/* {data.length > 0 ? data.map((_) => <p>Data</p>) : "no data"} */}
				</div>
				<Card className="flex-[0.3] w-fit">
					<CardHeader>
						<CardTitle className="text-xl">Filter</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col gap-1">
						<div className="flex items-center space-x-2">
							<Checkbox id="terms" />
							<label
								htmlFor="terms"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Remote
							</label>
						</div>
						<div className="flex items-center space-x-2">
							<Checkbox id="terms" />
							<label
								htmlFor="terms"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Internship
							</label>
						</div>
						<div className="flex items-center space-x-2">
							<Checkbox id="terms" />
							<label
								htmlFor="terms"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Web Development
							</label>
						</div>
					</CardContent>
					<CardFooter>
						<Button>Apply Filter</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};

export default JobSearch;
