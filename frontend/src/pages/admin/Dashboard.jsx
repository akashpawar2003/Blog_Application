import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState("")
  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setData(response.data.data);
        
      }
    } catch (error) {
      const message = error?.response?.data?.message;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Navbar/>
      <Link
          to="/profile"
          className="inline-block mt-25 ml-10 bg-red-600 text-white mb-4 px-4 sm:px-3 lg:px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Go Back Profile
      </Link>
      <section className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-red-600 mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white border-l-8 border-red-600 rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
          <p className="text-3xl font-bold text-red-600 mt-3">{data.user}</p>
        </div>

        <div className="bg-white border-l-8 border-red-500 rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700">Total Blogs</h2>
          <p className="text-3xl font-bold text-red-500 mt-3">{data.blog}</p>
        </div>

        <div className="bg-white border-l-8 border-red-500 rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700">
            Total Comments
          </h2>
          <p className="text-3xl font-bold text-red-500 mt-3">{data.comment}</p>
        </div>
      </div>
    </section>
    </>
  );
};

export default Dashboard;
