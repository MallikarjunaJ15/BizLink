import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import React from "react";

const HomePage = () => {
  return (
    <div className="p-6 overflow-hidden flex flex-col gap-4">
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default HomePage;
