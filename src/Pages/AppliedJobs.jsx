import React from "react";
import { useJobContext } from "../Context/JobContext";
import { NavLink } from "react-router-dom";

const AppliedJobs = () => {
  const { applied } = useJobContext();

  return (
    <>
      <div className="gap-4 px-[2.5%] pt-48 h-screen overflow-hidden">
        <div className="bg-gray-100 rounded-xl h-full scrollbar-hide overflow overflow-auto">
          <div className="sticky shadow-md top-0 p-4 rounded-t-md bg-gray-100 overflow-hidden">
            <div className="self-center text-center text-2xl">
              {applied.length === 0 ? `No Applied Jobs` : `Applied Jobs`}
            </div>
          </div>
          <div className="overflow overflow-auto">
            <div className="grid grid-cols-1 min-[840px]:grid-cols-2 overflow-auto">
              {applied.map((job) => {
                const {
                  id,
                  role,
                  contract,
                  location,
                  position,
                  company,
                } = job;
                return (
                  <NavLink to={`/SingleJob/${id}`}>
                    <div key={id} className="bg-gray-400 m-4 rounded-lg">
                      <div className="flex flex-col justify-between p-4 w-full">
                        <h1 className="text-lg md:text-xl font-semibold font-josefin mb-2">
                          {position}
                        </h1>
                        <h2 className="text-sm md:text-sm font-semibold font-josefin mb-2">
                          {company}
                        </h2>
                        <div className="flex flex-row gap-2">
                          <div className="bg-black text-white px-4 py-2 rounded-lg mt-4 hover:bg-[#7A7A7A] transition duration-300">
                            {role}
                          </div>
                          <div className="bg-black text-white px-4 py-2 rounded-lg mt-4 hover:bg-[#7A7A7A] transition duration-300">
                            {contract}
                          </div>
                          <div className="bg-black text-white px-4 py-2 rounded-lg mt-4 hover:bg-[#7A7A7A] transition duration-300">
                            {location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppliedJobs;
