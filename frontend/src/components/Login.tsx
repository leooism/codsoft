import React, { useRef, useState } from "react";
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

import "react-toastify/dist/ReactToastify.css";
import { useUserContext } from "../store/UserContext";
import { Form } from "react-router-dom";

// import { useCookies } from "react-cookie";
// import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import API_URL from "../constant/APIURL";

const Login = () => {
	const formRef = useRef<HTMLFormElement>(null);
	const submitterRef = useRef<HTMLButtonElement>(null);
	const [isLoading, setIsLoading] = useState(false);
	const { setUser } = useUserContext();
	const handleLoginSubmit = async (e) => {
		e.preventDefault();
		const fetchData = async () => {
			// Default options are marked with *
			setIsLoading(true);
			const formData = new URLSearchParams(
				new FormData(formRef.current, submitterRef.current)
			);
			const response = await fetch(`${API_URL}/user/login`, {
				method: "POST",
				credentials: "include",
				body: formData,
			});
			const data = await response.json();
			if (data.status === "Success")
				setUser({
					_id: data.data.user._id,
					email: data.data.user.email,
					fullName: data.data.user.firstName,
					role: data.data.user.role,
					profileImage: data.data.user.photo,
				});

			if (data.status === "Failed")
				toast(data.message, {
					position: "top-right",
					autoClose: 10,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
					progress: undefined,
					theme: "light",
				});

			setIsLoading(false);
		};
		try {
			fetchData();
		} catch (err) {
			toast.error(err.message, {
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
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			<DialogTrigger>
				<Button variant="outline">Login</Button>
			</DialogTrigger>
			<DialogContent className="bg-white ">
				<DialogHeader>
					<DialogTitle>Log In</DialogTitle>
					{isLoading && <p>Loggging</p>}
				</DialogHeader>
				<Form
					onSubmit={handleLoginSubmit}
					className="flex flex-col gap-2 "
					ref={formRef}
				>
					<div className="flex flex-col w-full gap-1">
						<Label htmlFor="email">Email</Label>
						<Input
							type="email"
							id="email"
							placeholder="Your Email Address"
							name="email"
							required
						/>
					</div>
					<div className="flex flex-col w-full gap-1">
						<Label htmlFor="email">Password</Label>
						<Input
							type="password"
							id="text"
							placeholder="Your Password"
							name="password"
							required
						/>
					</div>
					<Button className="w-fit" type="submit" ref={submitterRef}>
						Submit
					</Button>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default Login;
