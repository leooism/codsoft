import React from "react";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../@/components/ui/table";
import { JobApplicationType } from "./JobApplication";
import formatDate from "../libs/formatDate";

export function JobApplicationTable({
	application,
}: {
	application: JobApplicationType[];
}) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[200px]">Job Title</TableHead>
					<TableHead>Deadline</TableHead>
					<TableHead>Applied At</TableHead>
					<TableHead>Status</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{application.map((app) => (
					<TableRow key={app._id}>
						<TableCell className="font-medium">{app.job.title}</TableCell>
						<TableCell>"YO"</TableCell>
						<TableCell>{formatDate(app.appliedAt)}</TableCell>
						<TableCell>{app.status}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
