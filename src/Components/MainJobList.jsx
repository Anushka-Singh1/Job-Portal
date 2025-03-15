import React from "react";
import { useFilterContext } from "../Context/FilterContext";
import { NavLink } from "react-router-dom";

function MainJobList() {
  const { filter_jobs } = useFilterContext();

  return (
    <div className="grid grid-cols-1 min-[840px]:grid-cols-2 h-full overflow-auto">
      {filter_jobs.map((curElem) => {
        const { id, title, body, role, contract, location, position, company } =
          curElem;
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
  );
}

export default MainJobList;
