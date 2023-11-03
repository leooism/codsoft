import React from "react";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../@/components/ui/avatar";

export function ApplicantsTable() {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Applicant</TableHead>
					<TableHead>Position</TableHead>
					<TableHead>Company</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody className="">
				{[1, 2, 3, 5].map((e) => (
					<TableRow key={e} className="">
						<TableCell className="font-medium">
							<Avatar>
								<AvatarImage src="https://github.com/shadcn.png" />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						</TableCell>
						<TableCell>Full Stack Development</TableCell>
						<TableCell>InfoSys Developer.Inc</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
