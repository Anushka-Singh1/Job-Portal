const JobReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: true };
    case "ERROR":
      return { ...state, isLoading: false, isError: true };
    case "SET_API_DATA":
      return {
        ...state,
        isLoading: false,
        jobs: action.payload,
      };
    case "SET_SINGLE_LOADING":
      return { ...state, isSingleLoading: true };
    case "SET_SINGLE_PRODUCT":
      return { ...state, isSingleLoading: false, singleJob: action.payload };
    case "SET_SINGLE_ERROR":
      return { ...state, isSingleLoading: false, isError: true };
    case "ADD_TO_APPLIED":
      return { ...state, applied: [...state.applied, action.payload] };
    default:
      return state;
  }
};
export default JobReducer;
