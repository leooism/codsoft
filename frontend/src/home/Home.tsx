import React from "react";

import Header from "./Header";
import Hero from "./Hero";
import JobTabs from "./JobTabs";

function Home() {
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
