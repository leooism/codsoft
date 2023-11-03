import React, { useEffect, useState } from "react";
import { HamburgerMenuIcon, DashboardIcon } from "@radix-ui/react-icons";
import { Button } from "../@/components/ui/button";
import logo from "../assets/logo.svg";

import Login from "../components/Login";
import Signup from "../components/Signup";
import { Link } from "react-router-dom";
import { useUserContext } from "../main";

const Header = () => {
	const [isLoggedIn, setIsloggedIn] = useState(false);
	const { email } = useUserContext();
	useEffect(() => {
		if (!email) setIsloggedIn(false);
		if (email) setIsloggedIn(true);
	}, [email]);
	return (
		<header className="flex justify-between p-2 items-center">
			<div className="logo flex-1 ml-2">
				<img src={logo} alt="logo" className=" w-32 h-10 scale-[3]" />
			</div>
			<Button variant="outline" className="sm:hidden">
				<HamburgerMenuIcon className="h-4 w-4" />
			</Button>
			<nav className="hidden sm:flex gap-2 text-sm items-center">
				<a href="#">About</a>
				<a href="#">Contact</a>
				{!isLoggedIn && (
					<div className="flex gap-2">
						<Login />
						<Signup />
					</div>
				)}
				{isLoggedIn && (
					<Link to={"/dashboard"} className="flex items-center ml-2 gap-2">
						<DashboardIcon /> <p className="text-xs">Go to dashboard</p>
					</Link>
				)}
			</nav>
		</header>
	);
};

export default Header;
