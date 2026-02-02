import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import moment from "moment";
import Navbar from "../../components/Navbar";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { id } = useParams();

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/blog/myblogs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.success) {
        setBlogs(response.data.data);
      }
    } catch (error) {
      const message = error?.response?.data?.message;
      toast.error(message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        toast.success("Blog deleted successfully");
        fetchBlogs();
      }
    } catch (error) {
      const message = error?.response?.data?.message;
      toast.error(message || "Failed to delete blog");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [id]);

  return (
    <>
      <Navbar />
      <section className="mt-15 cursor-pointer bg-gray-50 min-h-screen px-4  sm:px-6 lg:px-10 py-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-red-600 text-center mb-10">
          {blogs.length == 0 ? "You are not created Blogs" : "My Blogs"}
        </h1>
        <Link
          to="/profile"
          className="inline-block bg-red-600 text-white mb-4 px-4 sm:px-3 lg:px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Go Back Profile
        </Link>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {blogs?.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 flex flex-col"
            >
              <img
                onClick={() => navigate(`/blogs/${blog._id}`)}
                src={blog.blogImage}
                alt={blog.title}
                className="h-48 sm:h-44 lg:h-48 w-full object-cover rounded-t-xl"
              />

              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-lg sm:text-xl font-semibold mb-2">
                  {blog.title}
                </h2>

                <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3">
                  {blog.content}
                </p>

                <div className="mt-auto flex gap-2">
                  <button
                    onClick={() => navigate(`/profile/blog-update/${blog._id}`)}
                    className="cursor-pointer flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(id) => handleDelete(blog._id)}
                    className="cursor-pointer flex-1 hover:bg-red-700 transition  bg-red-600  text-white py-2 rounded-md"
                  >
                    Delete
                  </button>
                </div>

                <p className="text-gray-600 text-sm mt-2">
                  {moment(blog.createdAt).format("DD MMM YYYY")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default MyBlogs;
