import React from "react";
import MainImage from "../assets/main.svg";

function About() {
  return (
    <>
      <div className="mx-[5vh] mt-40 md:mt-40 lg:mt-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-gray-100 w-full p-10 rounded-lg">
          <div className="p-8">
            <h1 className="text-4xl font-bold mt-6 md:mt-6">
              Job Listing Portal
            </h1>
            <p className="text-xl mt-6 font-josefin antialiased text-justify">
              Looking for your next big career move? Whether you're an
              experienced professional or just starting out, our job listing
              portal connects you with top companies across various industries.
              Explore a wide range of opportunities, from tech startups to
              established enterprises, and find the perfect role that matches
              your skills and aspirations. With real-time job postings,
              intuitive search filters, and company insights, we make job
              hunting seamless and efficient. Start your journey today and take
              the next step toward your dream job!
            </p>
          </div>
          <div className="w-[60%] place-self-center">
            <img src={MainImage} alt="about" className="w-full" />
          </div>
        </div>
      </div>
    </>
  );
}
export default About;
