import React, { useState } from "react";
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

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
import { useUserContext } from "../main";
// import { useCookies } from "react-cookie";

// import { useNavigate } from "react-router-dom";

const Login = () => {
	// const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	// const navigate = useNavigate();
	const { setUser } = useUserContext();
	const handleLoginSubmit = async (e) => {
		e.preventDefault();
		const fetchData = async () => {
			// Default options are marked with *
			setIsLoading(true);
			const response = await fetch("http://localhost:3000/user/login", {
				method: "POST",
				credentials: "include",
				body: JSON.stringify({
					email,
					password,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = response.json();

			setUser({
				_id: data.data.user._id,
				email: data.data.user.email,
				fullName: data.data.user.firstName,
				role: data.data.user.role,
				profileImage: data.data.user.photo,
			});
			// if (data.token) {
			// 	// window.cookie
			// 	setCookie("jwt", data.token, {
			// 		expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
			// 		httpOnly: true,
			// 	});
			// }

			setIsLoading(false);

			toast("Sucessfully Logged In", {
				position: "top-right",
				autoClose: 10,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		};
		try {
			fetchData();
		} catch (err) {
			toast.error("🦄 Wow so easy!", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			setIsLoading(false);
		}
	};

	return (
		<Dialog>
			

			<DialogTrigger>
				<Button variant="outline">Login</Button>
			</DialogTrigger>
			<DialogContent className="bg-white ">
				<DialogHeader>
					<DialogTitle>Log In</DialogTitle>
					{isLoading && <p>Loggging</p>}
				</DialogHeader>
				<form
					action=""
					onSubmit={handleLoginSubmit}
					className="flex flex-col gap-2 "
				>
					<div className="flex flex-col w-full gap-1">
						<Label htmlFor="email">Email</Label>
						<Input
							type="email"
							id="email"
							placeholder="Your Email Address"
							name="email"
							value={email}
							onChange={(e) => {
								setEmail(e?.target.value);
							}}
							required
						/>
					</div>
					<div className="flex flex-col w-full gap-1">
						<Label htmlFor="email">Password</Label>
						<Input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							id="text"
							placeholder="Your Password"
							name="password"
							required
						/>
					</div>
					<Button className="w-fit" type="submit">
						Submit
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default Login;
