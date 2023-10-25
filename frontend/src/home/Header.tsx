import React from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "../@/components/ui/button";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../@/components/ui/dialog";
import { Input } from "../@/components/ui/input";
import { Label } from "../@/components/ui/label";
import Upload from "./Upload";
import Select from "react-select";

const Header = () => {
	return (
		<header className="flex justify-between p-2 items-center">
			<div className="logo flex-1">logo</div>
			<Button variant="outline" className="sm:hidden">
				<HamburgerMenuIcon className="h-4 w-4" />
			</Button>
			<nav className="hidden sm:flex gap-2 text-sm items-center">
				<a href="#">About</a>
				<a href="#">Contact</a>
				<div className="flex gap-2">
					<Dialog>
						<DialogTrigger>
							<Button variant="outline">Login</Button>
						</DialogTrigger>
						<DialogContent className="bg-white ">
							<DialogHeader>
								<DialogTitle>Log In</DialogTitle>
							</DialogHeader>
							<div className="flex flex-col w-full gap-1">
								<Label htmlFor="email">Email</Label>
								<Input
									type="email"
									id="email"
									placeholder="Your Email Address"
								/>
							</div>
							<div className="flex flex-col w-full gap-1">
								<Label htmlFor="email">Password</Label>
								<Input type="password" id="text" placeholder="Your Password" />
							</div>
							<Button className="w-fit">Submit</Button>
						</DialogContent>
					</Dialog>
					<Dialog>
						<DialogTrigger>
							<Button variant="secondary">Sign Up</Button>
						</DialogTrigger>
						<DialogContent className="bg-white max-h-[80vh] overflow-y-scroll">
							<DialogHeader>
								<DialogTitle>Sign Up</DialogTitle>
							</DialogHeader>
							<div className="grid w-full  gap-1.5 grid-cols-2">
								<div className="flex flex-col w-full gap-1">
									<Label htmlFor="fname">First Name</Label>
									<Input type="text" id="fname" placeholder="First Name" />
								</div>
								<div className="flex flex-col w-full gap-1">
									<Label htmlFor="lname">Last Name</Label>
									<Input type="text" id="lname" placeholder="Last Name" />
								</div>
							</div>
							<div className="grid w-full  gap-1.5 grid-cols-2">
								<div className="flex flex-col w-full gap-1">
									<Label htmlFor="email">Email</Label>
									<Input
										type="email"
										id="email"
										placeholder="Your Email Address"
									/>
								</div>
								<div className="flex flex-col w-full gap-1">
									<Label htmlFor="email">Phone Number</Label>
									<PhoneInput
										country={"us"}
										value=""
										placeholder="Your Phone Number"
										containerClass="flex h-full w-full"
										inputClass="flex-1 p-2"
										onChange={() => {}}
										// inputComponent={() => (
										// 	<Input type="number" placeholder="Your Phone Number" />
										// )}
									/>
								</div>
							</div>
							<div className="flex flex-col w-full gap-1">
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

							<div className="flex flex-col w-full gap-1">
								<Label>Upload Resume</Label>
								<Upload />
							</div>
							<div className="flex flex-col w-full gap-1">
								<Label htmlFor="pwd">Password</Label>
								<Input type="password" id="pwd" placeholder="Password" />
							</div>
							<div className="flex flex-col w-full gap-1">
								<Label htmlFor="pwdc">Confirm Password</Label>
								<Input
									type="password"
									id="pwdc"
									placeholder="Confirm Password"
								/>
							</div>
							<Button className="w-fit">Submit</Button>
						</DialogContent>
					</Dialog>
				</div>
			</nav>
		</header>
	);
};

export default Header;
