import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useJobContext } from "../Context/JobContext";

const JobApplicationForm = () => {
  const { id } = useParams();
  const { singleJob, isSingleLoading, getSingleJob, addToApplied, applied } =
    useJobContext();
  const { position, company, postedAt, location } = singleJob;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    resumeLink: "",
  });

  useEffect(() => {
    getSingleJob(id);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        formData
      );
      console.log(response);
      if (response.status == 201) {
        addToApplied(singleJob);
        alert("Application submitted successfully!");
        navigate("/");
      } else {
        alert("Failed to submit application. Try again.");
      }
    } catch (error) {
      alert("Failed to submit application. Try again.");
    }
  };

  if (isSingleLoading) {
    return (
      <div className="p-4 mx-[5vh] mt-4 bg-black rounded-lg font-josefin font-semibold text-center">
        ......loading
      </div>
    );
  }

  return (
    <div className="p-6 mt-36 grid grid-cols-1 min-[840px]:grid-cols-2">
      <div className="flex flex-wrap lg:flex-nowrap mt-6">
        <div className="w-full bg-white p-6 rounded-lg shadow-lg mx-[1.5%]">
          <div className="flex flex-row justify-between">
            <p className="text-black text-xl font-bold">{position}</p>
            <p className="text-gray-700 mr-4">Posted {postedAt}</p>
          </div>
          <p className="text-gray-700 mb-4 font-bold">
            {company}, {location}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap mt-6">
        <div className="w-full bg-white p-6 rounded-lg shadow-lg mx-[1.5%]">
          <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
            <div>
              <label className="block font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-black"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Resume Link
              </label>
              <input
                type="url"
                name="resumeLink"
                value={formData.resumeLink}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-black"
              />
            </div>

            <button
              type="submit"
              className="place-self-center p-2 text-white font-semibold rounded-lg bg-black hover:bg-[#7A7A7A]"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationForm;
