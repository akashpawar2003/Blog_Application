import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put("http://localhost:5000/user/change-password", {
        oldPassword,
        newPassword,
      },{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      if (response.data.success) {
        toast.success(response.data.message);
        setNewPassword("");
        setOldPassword("");
        navigate("/profile");
      }
    } catch (error) {
      const message = error?.response?.data?.message;
      console.log(error);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center mt-15 bg-red-50">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
            Change Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Old Password
              </label>
              <input
                value={oldPassword}
                placeholder="Enter your Old Password"
                onChange={(e) => setOldPassword(e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                placeholder="Enter a New password"
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
            >
              {loading ? "Please Wait..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
