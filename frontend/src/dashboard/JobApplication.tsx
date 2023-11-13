import React from "react";
import { JobApplicationTable } from "./JobApplicationTable";
import useSWR from "swr";
import fetcher from "../libs/fetcher";
import { useUserContext } from "../store/UserContext";
import { jobType } from "../jobs/JobSearch";
export type JobApplicationType = {
	_id: string;
	status: string;
	job: jobType;
	appliedAt: string;
};
const JobApplication = () => {
	const { _id } = useUserContext();

	const { data, error, isLoading } = useSWR<{
		status: string;
		data: JobApplicationType;
	}>(`${API_URL}/user/appliedJobs?userId=${_id}`, fetcher, {
		refreshInterval: 2000,
	});
	if (isLoading) return <p>Loading</p>;
	if (data && data.status === "Success")
		return <JobApplicationTable application={data.data} />;
};

export default JobApplication;
