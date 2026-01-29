import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(response.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);
      formData.append("location", location);
      if (image) {
        formData.append("profile", image);
      }

      const response = await axios.put(
        "http://localhost:5000/user/update/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);
      fetchUserData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setEmail(userData.email || "");
      setBio(userData.bio || "");
      setLocation(userData.location || "");
      setPreview(userData.profile || null);
    }
  }, [userData]);

  return (
    <div>
      <Navbar />

      <div className="flex flex-wrap items-center justify-center mt-24 mb-5 ml-5 gap-3">
        <Link to="/profile/my-blogs" className=" bg-red-600 text-white px-5 py-2 rounded-lg">
          My Blogs
        </Link>
        <Link to="/profile/addblog" className=" bg-red-600 text-white px-5 py-2 rounded-lg">
          Add Blog
        </Link>
        <Link to="/dashboard" className=" bg-red-600 text-white px-5 py-2 rounded-lg">
          Dashboard
        </Link>
        <Link to="/profile/change-password" className=" bg-red-600 text-white px-5 py-2 rounded-lg">
          Change Password
        </Link>
      </div>

      <div className=" bg-gray-100 flex items-center justify-center px-4 py-10">
        <div className="bg-white w-full max-w-5xl rounded-xl shadow-lg p-6 md:p-10">
          <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>

          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-10">
            <div className="flex justify-center">
              <div className="relative">
                {preview && (
                  <img
                    src={preview}
                    alt="Profile"
                    className="w-36 h-36 rounded-full object-cover border"
                  />
                )}
                <label className="absolute top-25 right-2 bg-white p-2 rounded-full shadow cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                  ⚙️
                </label>
              </div>
            </div>

            <div className="flex-1 space-y-5">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-md"
              />

              <input
                type="email"
                value={email}
                disabled
                className="w-full px-4 py-2 border rounded-md bg-gray-100"
              />

              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows="3"
                placeholder="Bio"
                className="w-full px-4 py-2 border rounded-md"
              />

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="w-full px-4 py-2 border rounded-md"
              />

              <button
                disabled={loading}
                className="cursor-pointer bg-red-600 text-white px-6 py-2 rounded-md disabled:opacity-50"
              >
                {loading ? "Updating" : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
