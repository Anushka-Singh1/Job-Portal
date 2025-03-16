import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../Reducer/JobReducer";
import { jobData } from "../Constant/data";

// Create a context
const AppContext = createContext();

const API = "https://jsonplaceholder.typicode.com/posts";

// Get applied jobs from localStorage
const getLocalStorage = () => {
  let appliedJobs = localStorage.getItem("appliedJobs");
  if (appliedJobs) {
    return JSON.parse(appliedJobs);
  } else {
    return [];
  }
};

const initialState = {
  isLoading: false,
  jobs: [],
  applied: getLocalStorage(),
  isError: false,
  isSingleLoading: false,
  singleJob: {},
};

const mergeById = (array1, array2) =>
  array1.map((itm) => ({
    ...array2.find((item) => item.id === itm.id && item),
    ...itm,
  }));

// Create a provider
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Save applied jobs to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("appliedJobs", JSON.stringify(state.applied));
  }, [state.applied]);

  const getJobs = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(url);
      const result = res.data;
      const jobs = mergeById(result, jobData);
      dispatch({ type: "SET_API_DATA", payload: jobs });
    } catch (error) {
      dispatch({ type: "ERROR" });
    }
  };

  //For Single Job
  const getSingleJob = async (jobId) => {
    dispatch({ type: "SET_SINGLE_LOADING" });
    try {
      // First find the job in our local data
      const parsedId = parseInt(jobId);
      const localJob = jobData.find(job => job.id === parsedId);
      
      if (!localJob) {
        dispatch({ type: "SET_SINGLE_ERROR" });
        return;
      }

      // Set initial job data from local source
      dispatch({ type: "SET_SINGLE_PRODUCT", payload: localJob });

      // Then fetch additional details from API
      try {
        const res = await axios.get(`${API}/${jobId}`);
        const apiData = res.data;
        
        // Merge API data with local data
        const mergedJob = {
          ...localJob,
          body: apiData.body || localJob.body || "",
          title: apiData.title || localJob.title || ""
        };
        
        dispatch({ type: "SET_SINGLE_PRODUCT", payload: mergedJob });
      } catch (error) {
        // If API fails, we still have local data displayed
        console.error("API fetch failed, using local data only");
      }
    } catch (error) {
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  };

  useEffect(() => {
    getJobs(API);
  }, []);

  const addToApplied = (job) => {
    const isJobAlreadyApplied = state.applied.some(appliedJob => appliedJob.id === job.id);
    if (!isJobAlreadyApplied) {
      dispatch({ type: "ADD_TO_APPLIED", payload: job });
    }
  };
  
  return (
    <AppContext.Provider value={{ ...state, getSingleJob, addToApplied }}>
      {children}
    </AppContext.Provider>
  );
};

const useJobContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useJobContext };
