import React from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "../@/components/ui/button";
import logo from "../assets/logo.svg";

import Login from "../components/Login";
import Signup from "../components/Signup";

const Header = () => {
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
				<div className="flex gap-2">
					<Login />
					<Signup />
				</div>
			</nav>
		</header>
	);
};

export default Header;
