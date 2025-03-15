import React from "react";
import FilterSection from "../Components/FilterSection";
import { useFilterContext } from "../Context/FilterContext";
import MainJobList from "../Components/MainJobList";

function Jobs() {
  const { filter_jobs } = useFilterContext();
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 pl-[2.5%] pr-[2.5%] pb-[2.5%] pt-48 h-screen overflow-hidden">
        <div className="lg:col-span-1 bg-gray-200 p-4 sticky top-0 rounded-xl overflow-auto max-h-screen">
          <FilterSection />
        </div>
        <div className="lg:col-span-5 bg-gray-100 rounded-xl scrollbar-hide overflow-auto">
          <div className="sticky shadow-md top-0 p-4 rounded-t-md bg-gray-100 overflow-hidden">
            <div className="self-center text-center">
              <p>{filter_jobs ? filter_jobs.length : 0} Jobs Found</p>
            </div>
          </div>
          <div className="overflow overflow-auto">
            <MainJobList />
          </div>
        </div>
      </div>
    </>
  );
}

export default Jobs;
