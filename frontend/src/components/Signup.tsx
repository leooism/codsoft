import React from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../@/components/ui/dialog";

import { Button } from "../@/components/ui/button";

import "react-phone-input-2/lib/style.css";

import { Tabs, TabsList, TabsTrigger } from "../@/components/ui/tabs";
import { SignupForm } from "./SignupForm";

const Signup = () => {
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
								<TabsTrigger value="Candidate">Candidate</TabsTrigger>
								<TabsTrigger value="Employer">Employer</TabsTrigger>
							</div>
						</TabsList>
						<SignupForm role="Candidate" />
						<SignupForm role="Employer" />
					</Tabs>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default Signup;
