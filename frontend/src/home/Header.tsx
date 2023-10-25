import React from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "../@/components/ui/button";

const Header = () => {
	return (
		<header className="flex justify-between p-2 items-center">
			<div className="logo flex-1">logo</div>
			<Button variant="outline" className="sm:hidden">
				<HamburgerMenuIcon className="h-4 w-4" />
			</Button>
			<nav className="hidden sm:flex gap-2 text-sm items-center">
				<a href="#">About</a>
				<a href="#">Contact</a>
				<div className="flex gap-2">
					<Button variant="outline">Login</Button>
					<Button variant="secondary">Sign Up</Button>
				</div>
			</nav>
		</header>
	);
};

export default Header;
