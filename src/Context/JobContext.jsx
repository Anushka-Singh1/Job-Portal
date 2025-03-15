import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../Reducer/JobReducer";
import { jobData } from "../Constant/data";

// Create a context
const AppContext = createContext();

const API = "https://jsonplaceholder.typicode.com/posts";
const initialState = {
  isLoading: false,
  jobs: [],
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
  const getJobs = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(url);
      const result = res.data;
      const jobs = mergeById(result, jobData);
      console.log(jobs);
      dispatch({ type: "SET_API_DATA", payload: jobs });
    } catch (error) {
      dispatch({ type: "ERROR" });
    }
  };

  //For Single Job
  const getSingleJob = async (jobId) => {
    dispatch({ type: "SET_SINGLE_LOADING" });
    try {
      const res = await axios.get(`${API}/${jobId}`);
      const result = res.data;
      const job = jobData.find((job) => job.id == jobId);
      const singleJob = Object.assign({}, result, job);
      console.log(singleJob);
      dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleJob });
    } catch (error) {
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  };
  useEffect(() => {
    getJobs(API);
  }, []);
  return (
    <AppContext.Provider value={{ ...state, getSingleJob }}>
      {children}
    </AppContext.Provider>
  );
};

const useJobContext = () => {
  return useContext(AppContext);
};
export { AppProvider, AppContext, useJobContext };
