import React, { useRef } from "react";
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

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import Upload from "./Upload";
import Select from "react-select";

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../@/components/ui/tabs";
import { Form } from "react-router-dom";

const Signup = () => {
	const form = useRef<HTMLFormElement>(null);
	const submitter = useRef<HTMLButtonElement>(null);
	const formTwo = useRef<HTMLFormElement>(null);
	const submitterTwo = useRef<HTMLButtonElement>(null);
	return (
		<Dialog>
			<DialogTrigger>
				<Button variant="secondary">Sign Up</Button>
			</DialogTrigger>
			<DialogContent className="bg-white max-h-[80vh] overflow-y-scroll">
				<DialogHeader className="flex j	tify-between">
					<Tabs defaultValue="candidate">
						<TabsList className="flex gap-2 bg-transparent items-center justify-between">
							<DialogTitle>Sign Up</DialogTitle>
							<div className="flex gap-1">
								<TabsTrigger value="candidate">Candidate</TabsTrigger>
								<TabsTrigger value="employer">Employer</TabsTrigger>
							</div>
						</TabsList>
						<Form
							ref={form}
							method="post"
							onSubmit={async (e) => {
								e.preventDefault();
								const formData = new URLSearchParams(
									new FormData(form.current, submitter.current)
								);

								let response = await fetch(
									"http://localhost:3000/user/signup",
									{
										method: "post",
										body: formData,
										credentials: "include",
										mode: "cors",
									}
								);
								const data = await response.json();
								console.log(data);
							}}
						>
							<TabsContent value="candidate" className="flex flex-col gap-2">
								<input
									type="text"
									name="role"
									value="Candidate"
									className="hidden"
								/>
								<div className="grid w-full  gap-1.5 grid-cols-2">
									<div className="flex flex-col w-full gap-1">
										<Label htmlFor="fname">First Name</Label>
										<Input
											type="text"
											id="fname"
											placeholder="First Name"
											name="firstName"
											required
										/>
									</div>
									<div className="flex flex-col w-full gap-1">
										<Label htmlFor="lname">Last Name</Label>
										<Input
											type="text"
											id="lname"
											placeholder="Last Name"
											name="lastName"
											required
										/>
									</div>
								</div>
								<div className="grid w-full  gap-1.5 grid-cols-2">
									<div className="flex flex-col w-full gap-1">
										<Label htmlFor="email">Email</Label>
										<Input
											type="email"
											id="email"
											placeholder="Your Email Address"
											name="email"
											required
										/>
									</div>
									<div className="flex flex-col w-full gap-1">
										<Label htmlFor="email">Phone Number</Label>
										<PhoneInput
											inputProps={{ name: "phoneNumber", required: true }}
											country={"us"}
											placeholder="Your Phone Number"
											containerClass="flex h-full w-full"
											inputClass="flex-1 p-2"
										/>
									</div>
								</div>
								<div className="flex flex-col w-full gap-1">
									<Label htmlFor="lname">Sectors </Label>
									<Select
										closeMenuOnSelect={false}
										// defaultValue={[colourOptions[0], colourOptions[1]]}
										isMulti
										name="sectors"
										required
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
									<Input
										type="password"
										id="pwd"
										placeholder="Password"
										name="password"
										required
									/>
								</div>
								<div className="flex flex-col w-full gap-1">
									<Label htmlFor="pwdc">Confirm Password</Label>
									<Input
										type="password"
										name="passwordConfirm"
										id="pwdc"
										placeholder="Confirm Password"
										required
									/>
								</div>
							</TabsContent>
							<Button className="w-fit" type="submit" ref={submitter}>
								Submit
							</Button>
						</Form>
						<Form
							method="post"
							ref={formTwo}
							onSubmit={async (e) => {
								e.preventDefault();
								const formData = new URLSearchParams(
									new FormData(formTwo.current, submitterTwo.current)
								);

								let response = await fetch(
									"http://localhost:3000/user/signup",
									{
										method: "post",
										body: formData,
										credentials: "include",
										mode: "cors",
									}
								);
								console.log(response);
							}}
						>
							<input
								type="text"
								name="role"
								value="Employer"
								className="hidden"
							/>
							<TabsContent value="employer" className="flex flex-col gap-2">
								<div className="grid w-full  gap-1.5 grid-cols-2">
									<div className="flex flex-col w-full gap-1">
										<Label htmlFor="fname">First Name</Label>
										<Input
											type="text"
											id="fname"
											placeholder="First Name"
											name="firstName"
										/>
									</div>
									<div className="flex flex-col w-full gap-1">
										<Label htmlFor="lname">Last Name</Label>
										<Input
											type="text"
											id="lname"
											placeholder="Last Name"
											name="lastName"
										/>
									</div>
								</div>
								<div className="grid w-full  gap-1.5 grid-cols-2">
									<div className="flex flex-col w-full gap-1">
										<Label htmlFor="email">Email</Label>
										<Input
											type="email"
											id="email"
											placeholder="Your Email Address"
											name="email"
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
											inputProps={{ name: "phoneNumber", required: true }}
										/>
									</div>
								</div>
								<div className="flex flex-col w-full gap-2">
									<Label htmlFor="lname">Organization Name </Label>
									<Input
										placeholder="Your Organization Name"
										name="company"
										// styles={colourStyles}
									/>
								</div>
								<div className="flex flex-col w-full gap-1">
									<Label htmlFor="pwd">Password</Label>
									<Input
										type="password"
										id="pwd"
										placeholder="Password"
										name="password"
									/>
								</div>
								<div className="flex flex-col w-full gap-1">
									<Label htmlFor="pwdc">Confirm Password</Label>
									<Input
										type="password"
										id="pwdc"
										placeholder="Confirm Password"
										name="passwordConfirm"
									/>
								</div>
								<Button className="w-fit" type="submit" ref={submitterTwo}>
									Submit
								</Button>
							</TabsContent>
						</Form>
					</Tabs>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default Signup;
