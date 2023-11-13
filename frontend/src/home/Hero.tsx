import React from "react";
import hero from "../assets/hero.svg";
import { Button } from "../@/components/ui/button";

import { Separator } from "../@/components/ui/separator";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../@/components/ui/select";
import { Form } from "react-router-dom";
const Hero = () => {
	return (
		<section className="flex justify-center items-center h-[80vh] flex-col gap-2">
			<img src={hero} alt="Hero Image" className="w-[80%] h-[80%]" />
			<Form
				className="flex gap-5 bg-white sm:flex-row flex-col  rounded-2xl shadow-2xl p-2 items-center"
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<div className="flex gap-3 sm:flex-row flex-col md:items-center">
					<div className="flex flex-col gap-2">
						<label htmlFor="location">Location</label>
						<input
							type="text"
							id="location"
							placeholder="Enter location"
							className="p-2 border-2 outline-none rounded-lg border-gray-400"
						/>
					</div>
					<Separator
						orientation="vertical"
						className="hidden md:flex h-14 mt-5 "
					/>
					<div className="flex flex-col gap-2">
						<label htmlFor="type">Type</label>
						<Select>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Select a type" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="apple">Full Time</SelectItem>
									<SelectItem value="banana">Remote</SelectItem>
									<SelectItem value="blueberry">Internship</SelectItem>
									<SelectItem value="grapes">Remote Internship</SelectItem>
									<SelectItem value="pineapple">Part Time</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>{" "}
					</div>
				</div>
				<Button
					variant="secondary"
					className="bg-blue-400 text-white mt-5"
					type="submit"
				>
					Search
				</Button>
			</Form>
		</section>
	);
};

export default Hero;
