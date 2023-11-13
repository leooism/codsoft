import React, { useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Hero from "./Hero";
import JobTabs from "./JobTabs";
import { useCookies } from "react-cookie";
import { Form, useNavigate } from "react-router-dom";
import { useUserContext } from "../store/UserContext";
import API_URL from "../constant/APIURL";
import { Card, CardHeader } from "../@/components/ui/card";
import { Label } from "../@/components/ui/label";
import { Input } from "../@/components/ui/input";
import { Button } from "../@/components/ui/button";
import { Textarea } from "../@/components/ui/textarea";

function Home() {
	const { setUser } = useUserContext();
	const [cookie] = useCookies(["jwt"]);
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
			const response = await axios.post(
				`${API_URL}/user/isLoggedIn`,
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
	}, [cookie, navigate]);
	return (
		<div className="flex flex-col sm:gap-10 gap-24">
			<Header />
			<Hero />
			<JobTabs />

			<section
				id="about"
				className="font-semibold p-2 text-justify flex flex-col items-center"
			>
				<h1 className="text-3xl font-semibold">About</h1>
				<p className="w-[80%] flex flex-col gap-2">
					<span>
						Welcome to jobshala, the ultimate online destination for job seekers
						and employers. Whether you are looking for a new career opportunity,
						or want to hire the best talent for your organization, jobshala is
						here to help you. Jobshala is a website for job portal, where
						employers can post jobs and candidates can apply for jobs. We offer
						a simple, fast, and efficient platform to connect job seekers and
						employers across various industries and locations. You can browse
						through thousands of jobs, filter them by category, location,
						salary, experience, and more, and apply with just a few clicks. You
						can also create your profile, upload your resume, and showcase your
						skills and achievements to potential employers. Jobshala is more
						than just a job portal. We are a community of passionate and driven
						professionals who want to make a difference in the world. We believe
						that everyone deserves a fulfilling and rewarding career, and we are
						committed to helping you achieve your goals.
					</span>
					<br></br>
					<span>
						We provide you with the latest career news, tips, and advice, as
						well as access to online courses, webinars, events, and networking
						opportunities. We also have a dedicated team of experts who can
						assist you with resume writing, interview preparation, career
						coaching, and more. Jobshala is your one-stop shop for all your
						career needs. Whether you are a fresh graduate, a seasoned
						professional, or a career changer, jobshala is the place for you.
						Join us today and discover the endless possibilities that await you.
						Jobshala is the job portal you can trust.Welcome to jobshala, the
						ultimate online destination for job seekers and employers. Whether
						you are looking for a new career opportunity, or want to hire the
						best talent for your organization, jobshala is here to help you.
						Jobshala is a website for job portal, where employers can post jobs
						and candidates can apply for jobs. We offer a simple, fast, and
						efficient platform to connect job seekers and employers across
						various industries and locations. You can browse through thousands
						of jobs, filter them by category, location, salary, experience, and
						more, and apply with just a few clicks. You can also create your
						profile, upload your resume, and showcase your skills and
						achievements to potential employers. Jobshala is more than just a
						job portal.
					</span>
					<br></br>
					<span>
						We are a community of passionate and driven professionals who want
						to make a difference in the world. We believe that everyone deserves
						a fulfilling and rewarding career, and we are committed to helping
						you achieve your goals. We provide you with the latest career news,
						tips, and advice, as well as access to online courses, webinars,
						events, and networking opportunities. We also have a dedicated team
						of experts who can assist you with resume writing, interview
						preparation, career coaching, and more. Jobshala is your one-stop
						shop for all your career needs. Whether you are a fresh graduate, a
						seasoned professional, or a career changer, jobshala is the place
						for you. Join us today and discover the endless possibilities that
						await you. Jobshala is the job portal you can trust.
					</span>
				</p>
			</section>

			<Card className="w-[60%] p-2 mx-auto bg-white shadow-2xl" id="contact">
				<CardHeader className="py-2 px-0 font-semibold">Contact Us</CardHeader>
				<Form className="flex flex-col gap-3 ">
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
						<Label htmlFor="message">Your Message</Label>
						<Textarea id="message" placeholder="Enter your message" />
					</div>
					<Button className="w-fit" type="submit">
						Submit
					</Button>
				</Form>
			</Card>

			<footer className="items-center bg-gray-900 w-full h-32 flex flex-col  gap-2 justify-end">
				<p className="text-white font-semibold">
					Powered by Karma, the leading platform for online business solutions.
				</p>
				<p className="text-white gap-2 flex ">
					Follow us on: <span className="hover:underline">Facebook</span> |
					<span className="hover:underline">Twitter</span> |{" "}
					<span className="hover:underline">LinkedIn</span> |
					<span className="hover:underline">Instagram</span>
				</p>
				<p className="text-white text-sm italic">
					© 2023 Jobshala. All rights reserved. | Terms of Service | Privacy
					Policy | Contact Us
				</p>
			</footer>
		</div>
	);
}

export default Home;
