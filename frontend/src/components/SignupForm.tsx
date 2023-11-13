import { Form } from "react-router-dom";
import { Input } from "../@/components/ui/input";
import { Label } from "../@/components/ui/label";
import { Button } from "../@/components/ui/button";
import React, { useRef } from "react";
import Select from "react-select";
import { TabsContent } from "../@/components/ui/tabs";
import Upload from "./Upload";
import PhoneInput from "react-phone-input-2";
import API_URL from "../constant/APIURL";

export const SignupForm = ({ role }: { role: string }) => {
	const form = useRef(null);
	const submitter = useRef(null);
	return (
		<TabsContent value={role} className="flex flex-col gap-2">
			<Form
				ref={form}
				method="post"
				className="gap-2 flex flex-col"
				onSubmit={async (e) => {
					e.preventDefault();
					const formData = new URLSearchParams(
						new FormData(form.current, submitter.current)
					);

					const response = await fetch(`${API_URL}/user/signup`, {
						method: "post",
						body: formData,
						credentials: "include",
						mode: "cors",
					});
					const data = await response.json();
					console.log(data);
				}}
			>
				<input type="text" name="role" value={role} className="hidden" />
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

				{role === "Candidate" && (
					<div className="flex flex-col w-full gap-1">
						<Label>Upload Resume</Label>
						<Upload />
					</div>
				)}
				{role === "Employer" && (
					<div className="flex flex-col w-full gap-2">
						<Label htmlFor="lname">Organization Name </Label>
						<Input
							placeholder="Your Organization Name"
							name="company"
							// styles={colourStyles}
						/>
					</div>
				)}
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
				<Button className="w-fit" type="submit" ref={submitter}>
					Submit
				</Button>
			</Form>
		</TabsContent>
	);
};
