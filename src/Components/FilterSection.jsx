import React from "react";
import { useFilterContext } from "../Context/FilterContext";

function FilterSection() {
  const {
    filters: { position, contract, location, role },
    updateFilterValue,
    all_jobs,
    clearFilters,
  } = useFilterContext();

  // To get data of each field
  const getUniqueData = (data, property) => {
    let newVal = data.map((curElem) => {
      return curElem[property];
    });
    return (newVal = ["All", ...new Set(newVal)]);
  };

  // Filter section unique data
  const contractData = getUniqueData(all_jobs, "contract");
  const roleData = getUniqueData(all_jobs, "role");
  const locationData = getUniqueData(all_jobs, "location");

  return (
    <>
      <div className="overflow-scroll scrollbar-hide max-h-full">
        <div>
          <h3 className="text-center mb-2 mt-2 font-josefin">Contract</h3>
          <div className="flex flex-col bg-black rounded-lg text-white">
            {contractData.map((curElem, index) => {
              const isSelected = contract === curElem;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={updateFilterValue}
                  name="contract"
                  value={curElem}
                  className={`focus:outline-none focus:ring-0 my-1 font-josefin ${
                    isSelected ? "bg-white text-black" : ""
                  }`}
                >
                  {curElem}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-center mb-2 mt-2 font-josefin">Roles</h3>
          <div className="flex justify-center">
            <form action="#" className="w-full">
              <select
                className="w-full border-2 pt-1.5 pb-0.5 border-black rounded-lg focus:outline-none focus:ring-0"
                name="role"
                id="role"
                onChange={updateFilterValue}
                value={role}
              >
                {roleData.map((curElem, index) => {
                  return (
                    <option
                      key={index}
                      name="role"
                      value={curElem}
                      className={role === curElem ? "bg-black text-white" : ""}
                    >
                      {curElem}
                    </option>
                  );
                })}
              </select>
            </form>
          </div>
        </div>

        <div>
          <h3 className="text-center mb-2 mt-2 font-josefin">Location</h3>
          <div className="flex justify-center">
            <form action="#" className="w-full">
              <select
                className="w-full border-2 pt-1.5 pb-0.5 border-black rounded-lg focus:outline-none focus:ring-0"
                name="location"
                id="location"
                onChange={updateFilterValue}
                value={location}
              >
                {locationData.map((curElem, index) => {
                  return (
                    <option
                      key={index}
                      name="location"
                      value={curElem}
                      className={role === curElem ? "bg-black text-white" : ""}
                    >
                      {curElem}
                    </option>
                  );
                })}
              </select>
            </form>
          </div>
        </div>

        <div className="flex flex-wrap mt-4 mb-4 justify-center">
          <button
            className="rounded-lg bg-black text-white px-4 p-1"
            onClick={clearFilters}
          >
            Clear Filter
          </button>
        </div>
      </div>
    </>
  );
}

export default FilterSection;
