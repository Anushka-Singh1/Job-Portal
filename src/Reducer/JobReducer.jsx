const JobReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case "ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    case "SET_API_DATA":
      return {
        ...state,
        isLoading: false,
        isError: false,
        jobs: action.payload,
      };
    case "SET_SINGLE_LOADING":
      return {
        ...state,
        isSingleLoading: true,
        isError: false
      };
    case "SET_SINGLE_PRODUCT":
      return {
        ...state,
        isSingleLoading: false,
        isError: false,
        singleJob: action.payload
      };
    case "SET_SINGLE_ERROR":
      return {
        ...state,
        isSingleLoading: false,
        isError: true,
        singleJob: {}
      };
    case "ADD_TO_APPLIED":
      return {
        ...state,
        applied: [...state.applied, action.payload]
      };
    default:
      return state;
  }
};

export default JobReducer;
