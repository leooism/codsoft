import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Hero from "./Hero";
import JobTabs from "./JobTabs";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../main";

function Home() {
	const { setUser } = useUserContext();
	const [cookie, _] = useCookies(["jwt"]);
	const navigate = useNavigate();
	useEffect(() => {
		if (!cookie.jwt) {
			setUser({
				_id: "",
				email: "",
				fullName: "",
				role: "",
				profileImage: "",
			});
		}
		const fetchData = async () => {
			if (!cookie.jwt) {
				return;
			}

			const response = await axios.post(
				"http://localhost:3000/user/isLoggedIn",
				{},
				{
					withCredentials: true,
				}
			);
			const { data } = response;

			if (data.status === "Success") {
				setUser({
					_id: data.data._id,
					email: data.data.email,
					fullName: data.data.firstName,
					role: data.data.role,
					profileImage: data.data.profileImage,
				});
			}
			navigate("/dashboard");
		};
		fetchData();
	}, [cookie]);
	return (
		<div className="flex flex-col sm:gap-10 gap-24">
			<Header />
			<Hero />
			<JobTabs />

			<footer className="bg-gray-900 w-full h-32"></footer>
		</div>
	);
}

export default Home;
