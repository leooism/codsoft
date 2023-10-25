import React from "react";
import { Button } from "../@/components/ui/button";

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../@/components/ui/tabs";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../@/components/ui/card";

const JobTabs = () => {
	return (
		<Tabs
			defaultValue="jobs"
			className="w-[80vw] mx-auto flex items-center justify-center flex-col"
		>
			<TabsList className="grid w-[40%] grid-cols-2 gap-2">
				<TabsTrigger value="jobs" className="font-semibold">
					Jobs
				</TabsTrigger>
				<TabsTrigger value="internships" className="font-semibold">
					Internships
				</TabsTrigger>
			</TabsList>
			<TabsContent
				value="jobs"
				className="flex items-center justify-center gap-2 w-full p-2 flex-wrap"
			>
				<Card className="md:w-60 w-48">
					<CardHeader>
						<CardTitle className="text-xl md:text-3xl">
							Full Stack Developer
						</CardTitle>
						<CardDescription className="flex flex-wrap gap-2">
							<div className="border border-gray-500 rounded-lg px-2  py-1 text-sm">
								Full Time
							</div>
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit,
							illo?
						</p>
					</CardContent>
					<CardFooter>
						<Button>Apply</Button>
					</CardFooter>
				</Card>
			</TabsContent>
			<TabsContent value="internships">
				<Card className="w-60">
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
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit,
							illo?
						</p>
					</CardContent>
					<CardFooter>
						<Button>Apply</Button>
					</CardFooter>
				</Card>{" "}
			</TabsContent>
		</Tabs>
	);
};

export default JobTabs;
