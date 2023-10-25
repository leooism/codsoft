import React, { useState } from "react";
import { Input } from "../@/components/ui/input";
import { Button } from "../@/components/ui/button";
import { Label } from "../@/components/ui/label";
import { Textarea } from "../@/components/ui/textarea";

import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "../@/lib/utils";

import { format } from "date-fns";

import { Calendar } from "../@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../@/components/ui/popover";

import Select from "react-select";
const Profile = () => {
	const [date, setDate] = useState<Date>();

	return (
		<form className="flex flex-col gap-2 w-full ">
			<h1 className="text-blue-600 font-bold text-3xl">Basic Information</h1>
			<div className="grid w-full  gap-1.5 grid-cols-2">
				<div className="flex flex-col w-full gap-1">
					<Label htmlFor="fname">First Name</Label>
					<Input
						type="text"
						id="fname"
						placeholder="First Name"
						value="Bidhan"
					/>
				</div>
				<div className="flex flex-col w-full gap-1">
					<Label htmlFor="lname">Last Name</Label>
					<Input
						type="text"
						id="lname"
						placeholder="Last Name"
						value="Bhandari"
					/>
				</div>
			</div>
			<div className="grid w-full  gap-1.5 grid-cols-2">
				<div className="flex flex-col w-full gap-1">
					<Label htmlFor="email">Email</Label>
					<Input
						type="text"
						id="email"
						placeholder="Your Email Address"
						value="leooism10@gmail.com"
					/>
				</div>
				<div className="flex flex-col w-full gap-1">
					<Label htmlFor="fname">Date Of Birth</Label>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant={"outline"}
								className={cn(
									"w-[280px] justify-start text-left font-normal",
									!date && "text-muted-foreground"
								)}
							>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{date ? format(date, "PPP") : <span>Pick a date</span>}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="flex w-auto flex-col space-y-2 p-2">
							<div className="rounded-md border">
								<Calendar mode="single" selected={date} onSelect={setDate} />
							</div>
						</PopoverContent>
					</Popover>
				</div>
			</div>
			<div className="grid w-full  gap-1.5 grid-cols-2">
				<div className="flex flex-col w-full gap-1">
					<Label htmlFor="fname">Phone</Label>
					<Input
						type="number"
						id="fname"
						placeholder="Your Phone Number"
						value="984749008"
					/>
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
			</div>
			<div className="grid w-full  gap-1.5 ">
				<Label htmlFor="bio">Enter your Bio</Label>
				<Textarea id="bio" placeholder="Enter your bio" rows={10} />
			</div>
			<Button>Save Changes</Button>
		</form>
	);
};

export default Profile;
