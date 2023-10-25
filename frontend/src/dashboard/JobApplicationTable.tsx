import React from "react";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../@/components/ui/table";
import { JobApplicationTableType } from "./Dashboard";

export function JobApplicationTable({
	application,
}: {
	application: JobApplicationTableType;
}) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[200px]">Job Title</TableHead>
					<TableHead>Type</TableHead>
					<TableHead>Deadline</TableHead>
					<TableHead>Status</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{application.map((invoice) => (
					<TableRow key={invoice.invoice}>
						<TableCell className="font-medium">{invoice.invoice}</TableCell>
						<TableCell>{invoice.paymentStatus}</TableCell>
						<TableCell>{invoice.paymentMethod}</TableCell>
						<TableCell>{invoice.totalAmount}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
