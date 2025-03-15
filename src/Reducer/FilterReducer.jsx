const FilterReducer = (state, action) => {
  switch (action.type) {
    case "Load_Filter_Jobs":
      return {
        ...state,
        all_jobs: [...action.payload],
        filter_jobs: [...action.payload],
        filters: {
          ...state.filters,
        },
      };

    case "GET_SORT_VALUE":
      return {
        ...state,
        sorting_value: action.payload,
      };

    case "UPDATE_FILTER_VALUE":
      const { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

    case "FILTER_JOBS":
      let { all_jobs } = state;
      let tempFilterJob = [...all_jobs];
      const { position, contract, location, role } = state.filters;

      if (position) {
        tempFilterJob = tempFilterJob.filter((curElem) => {
          return curElem.position
            .toLowerCase()
            .includes(position.toLowerCase());
        });
      }
      if (contract !== "All") {
        tempFilterJob = tempFilterJob.filter((curElem) => {
          return curElem.contract === contract;
        });
      }
      if (role !== "All") {
        tempFilterJob = tempFilterJob.filter((curElem) => {
          return curElem.role.toLowerCase() === role.toLowerCase();
        });
      }
      if (location !== "All") {
        tempFilterJob = tempFilterJob.filter((curElem) => {
          return curElem.location.includes(location);
        });
      }

      return {
        ...state,
        filter_jobs: tempFilterJob,
      };

    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          position: "",
          contract: "All",
          role: "All",
          location: "All",
        },
      };

    default:
      return state;
  }
};

export default FilterReducer;
