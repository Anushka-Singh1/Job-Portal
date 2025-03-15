import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useJobContext } from "../Context/JobContext";

function SingleJob() {
  const { singleJob, isSingleLoading, getSingleJob } = useJobContext();
  const { id } = useParams();

  const {
    position,
    title,
    body,
    company,
    featured,
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
          <p className="text-gray-700 mb-4">{body}</p>

          <p className="text-gray-700 font-bold">Job Specifications</p>
          <p className="text-gray-700">{role}</p>
          <p className="text-gray-700">{level}</p>
          <p className="text-gray-700">{contract}</p>

          <hr className="border-2 border-black my-4 w-90 max-w-[100%]" />
        </div>
      </div>
      <div className="bg-black text-white flex place-self-end mr-[1.5%] px-4 py-2 rounded-lg w-1/9 mt-4 hover:bg-[#7A7A7A] transition duration-300">
        Apply
      </div>
    </div>
  );
}

export default SingleJob;
