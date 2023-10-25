import React from "react";
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
const JobSearch = () => {
	return (
		<div className="flex flex-col gap-5">
			<div className="items-center flex justify-center w-full flex-col gap-2">
				<div className=" gap-3 hidden sm:flex ">
					<Select>
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
						type="text"
						placeholder="City"
						name="city"
						className="border border-gray-300 rounded-2xl p-2 w-32 outline-none"
					/>
					<input
						type="text"
						name="zip"
						placeholder="Zip Code"
						className="border border-gray-300 rounded-2xl p-2 w-32 outline-none"
					/>
					<input
						name="sector"
						type="text"
						placeholder="Sector"
						className="border border-gray-300 rounded-2xl p-2 w-32 outline-none"
					/>
				</div>
				<div className="flex p-4 gap-2 rounded-2xl bg-white shadow-2xl  ">
					<input
						type="text"
						placeholder="Search Jobs"
						className="bg-transparent outline-none border-none"
					/>
					<Button className="bg-blue-500">Search</Button>
				</div>
			</div>
			<div className="flex gap-2 w-full items-start justify-center">
				<div className="flex flex-col gap-2 flex-[0.6]">
					{[1, 2, 3, 4, 5].map((it) => (
						<Card key={it} className="w-full bg-transparent border-gray-400">
							<CardHeader>
								<CardTitle>Full Stack Developer</CardTitle>
								<CardDescription className="flex flex-wrap gap-2">
									<div className="border border-gray-500 rounded-lg px-2  py-1 text-sm">
										Internship
									</div>
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p>
									Lorem, ipsum dolor sit amet consectetur adipisicing elit.
									Velit, illo?
								</p>
							</CardContent>
							<CardFooter>
								<Button>Apply</Button>
							</CardFooter>
						</Card>
					))}
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
