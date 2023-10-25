import React from "react";
import Header from "../home/Header";

import JobSearch from "./JobSearch";
const Jobs = () => {
	return (
		<div className="flex flex-col gap-5 ">
			<Header />
			<JobSearch />{" "}
		</div>
	);
};

export default Jobs;
