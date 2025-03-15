import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useJobContext } from "../Context/JobContext";
import { NavLink } from "react-router-dom";

function SingleJob() {
  const { singleJob, isSingleLoading, getSingleJob, applied } = useJobContext();
  const { id } = useParams();

  const [isJobPreviouslyApplied, setIsJobPreviouslyApplied] = useState(false);
 
  const {
    position,
    body,
    company,
    role,
    level,
    postedAt,
    contract,
    location,
    languages,
    tools,
  } = singleJob;

  useEffect(() => {
    getSingleJob(id);
    const isTrue = applied.some((job) => job.id == id);
    setIsJobPreviouslyApplied(isTrue);
  }, []);

  if (isSingleLoading) {
    return (
      <div className="p-4 mx-[5vh] mt-4 bg-black rounded-lg font-josefin font-semibold text-center">
        ......loading
      </div>
    );
  }

  return (
    <div className="p-6 mt-40">
      <div className="flex flex-wrap lg:flex-nowrap mt-6">
        <div className="w-full bg-white p-6 rounded-lg shadow-lg mx-[1.5%]">
          <div className="flex flex-row justify-between">
            <p className="text-black text-xl font-bold">{position}</p>
            <p className="text-gray-700 mr-4">Posted {postedAt}</p>
          </div>
          <p className="text-gray-700 mb-4 font-bold">
            {company}, {location}
          </p>
          <p className="text-gray-700 font-bold">Job Description</p>
          <p className="text-gray-700 mb-4 text-justify">{body}</p>

          <p className="text-gray-700 font-bold">Job Specifications</p>
          <p className="text-gray-700">{role}</p>
          <p className="text-gray-700">{level}</p>
          <p className="text-gray-700">{contract}</p>
          <p className="text-gray-700 mt-4 font-bold">
            Skill and Tools Requirement
          </p>
          <p className="text-gray-700">{languages && languages.join(" ")}</p>
          <p className="text-gray-700">{tools && tools.join(" ")}</p>

          <hr className="border-2 border-black my-4 w-90 max-w-[100%]" />
        </div>
      </div>
      <NavLink to={`/${id}/apply`}>
        <button
          disabled={isJobPreviouslyApplied}
          className={`${
            isJobPreviouslyApplied ? "bg-[#7A7A7A]" : "bg-black"
          } text-white flex place-self-end mr-[1.5%] px-4 py-2 rounded-lg w-1/9 mt-4 hover:bg-[#7A7A7A] transition duration-300`}
        >
          {isJobPreviouslyApplied ? `Applied` : `Apply`}
        </button>
      </NavLink>
    </div>
  );
}

export default SingleJob;
