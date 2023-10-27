import React from "react";
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

const Login = () => {
	return (
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
					<Input type="email" id="email" placeholder="Your Email Address" />
				</div>
				<div className="flex flex-col w-full gap-1">
					<Label htmlFor="email">Password</Label>
					<Input type="password" id="text" placeholder="Your Password" />
				</div>
				<Button className="w-fit">Submit</Button>
			</DialogContent>
		</Dialog>
	);
};

export default Login;
