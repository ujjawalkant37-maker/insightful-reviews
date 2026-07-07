import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Trending from "./components/Trending";
import ExpertReviews from "./components/ExpertReviews";
import UserReviews from "./components/UserReviews";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col bg-background text-foreground">
			<Navbar />

			<main className="flex-1">
				<Hero />
				<Categories />
				<Trending />
				<ExpertReviews />
				<UserReviews />
				<CTA />
			</main>

			<Footer />
		</div>
	);
}

