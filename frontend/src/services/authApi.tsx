const login = async () => {
	const fetchData = async () => {
		// Default options are marked with *
		const response = await fetch("http://localhost:3000/user/login", {
			method: "POST", // *GET, POST, PUT, DELETE, etc.
			mode: "cors", // no-cors, *cors, same-origin
			cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
			credentials: "include", // include, *same-origin, omit
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: "follow", // manual, *follow, error
			referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: JSON.stringify({ email, password }), // body data type must match "Content-Type" header
		});
		const { data } = await response.json(); // parses JSON response into native JavaScript objects
		// setUser({
		//     email: data.user.email,
		//     fullName: data.user.firstName,
		//     role: data.user.role,
		//     profileImage: data.user.photo,
		// });

		// setIsLoading(false);

		// toast("Sucessfully Logged In", {
		// 	position: "top-right",
		// 	autoClose: 10,
		// 	hideProgressBar: false,
		// 	closeOnClick: true,
		// 	pauseOnHover: false,
		// 	draggable: true,
		// 	progress: undefined,
		// 	theme: "light",
		// });
		// navigate("/dashboard");
	};
};
