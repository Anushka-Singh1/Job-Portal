import { createContext, useContext, useEffect, useReducer } from "react";
import { useJobContext } from "./JobContext";
import reducer from "../Reducer/FilterReducer";

const FilterContext = createContext();

const initialState = {
  filter_jobs: [],
  all_jobs: [],
  sorting_value: "lowest",
  filters: {
    position: "",
    contract: "All",
    role: "All",
    location: "All",
  },
};

const FilterContextProvider = ({ children }) => {
  const { jobs } = useJobContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  //sorting function
  const sorting = (event) => {
    let userValue = event.target.value;
    dispatch({ type: "GET_SORT_VALUE", payload: userValue });
  };

  //To clear the filters
  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };

  //sorting function useEffect
  useEffect(() => {
    dispatch({ type: "FILTER_JOBS" });
    dispatch({ type: "SORTING_JOBS" });
  }, [jobs, state.sorting_value, state.filters]);

  // TO load all the jobs for list and grid view
  useEffect(() => {
    dispatch({ type: "Load_Filter_Jobs", payload: jobs });
  }, [jobs]);

  //update the filter values
  const updateFilterValue = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    return dispatch({ type: "UPDATE_FILTER_VALUE", payload: { name, value } });
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,
        sorting,
        updateFilterValue,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

const useFilterContext = () => {
  return useContext(FilterContext);
};

export { useFilterContext, FilterContextProvider, FilterContext };
