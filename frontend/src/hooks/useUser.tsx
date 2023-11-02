import { useState, useEffect } from "react";

async function useUser({
	email,
	password,
}: {
	email: string;
	password: string;
}) {
	const [data, setData] = useState();
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {}, [email, password]);

	return {
		user: data,
		isLoading,
		isError: error,
	};
}

export default useUser;
