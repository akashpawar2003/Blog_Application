import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import axios from "axios";
import moment from 'moment'


const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/blog/allblogs");
      if (response.data.success) {
        setBlogs(response?.data.data); 
      }
    } catch (error) {
      const message = error?.response?.data?.message;
      toast.error(message || "Failed to fetch blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <Navbar />
      <section className="bg-gray-50 min-h-screen px-4 mt-13 sm:px-6 lg:px-10 py-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-red-600 text-center mb-10">
          {!blogs ? "Blogs Are not created" : "All Blogs"}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {blogs?.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 flex flex-col"
            >
              <img
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

                <button
                  onClick={() => navigate(`/blogs/${blog._id}`)}
                  className="mt-auto cursor-pointer bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
                >
                  View Blog
                </button>
                <p className="text-gray-600 text-sm sm:text-base mb-1 mt-1 line-clamp-3">
                  {moment(blog.createdAt).format("DD MMM YYYY")}   Author- {blog.user?.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Blog;
