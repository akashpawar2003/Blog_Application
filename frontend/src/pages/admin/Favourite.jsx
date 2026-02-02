import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Navbar from "../../components/Navbar";

const Favourite = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/blog/favourite/blogs`,
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
          {!blogs ? "You are not like any blogs" : "Favourite Blogs"}
        </h1>
        <Link
          to="/profile"
          className="inline-block bg-red-600 text-white mb-4 px-4 sm:px-3 lg:px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Go Back Profile
        </Link>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {blogs.length === 0 && (
            <p className="text-gray-text-2xl sm:text-3xl font-bold text-red-600 text-center mb-10">
              No blogs found
            </p>
          )}
          {blogs?.map((blog) => (
            <div
              key={blog.blogId._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 flex flex-col"
            >
              <img
                src={blog.blogId.blogImage}
                alt={blog.blogId.title}
                className="h-48 sm:h-44 lg:h-48 w-full object-cover rounded-t-xl"
              />

              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h2 className="text-lg sm:text-xl font-semibold">
                    {blog.blogId.title}
                  </h2>

                  <img
                    src={
                      blog.blogId?.user?.profile ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="author"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                </div>

                <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3">
                  {blog.blogId.content}
                </p>

                <button
                  onClick={() => navigate(`/blogs/${blog.blogId._id}`)}
                  className="mt-auto cursor-pointer bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
                >
                  View Blog
                </button>

                <div className="flex justify-between items-center mt-2 text-gray-600 text-sm">
                  <p>{moment(blog.blogId.createdAt).format("DD MMM YYYY")}</p>
                  <p>Author - {blog.blogId?.user?.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Favourite;
