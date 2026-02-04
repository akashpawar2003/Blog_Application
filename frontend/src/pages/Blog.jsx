import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import axios from "axios";
import moment from "moment";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/blog/allblogs`);
      if (response.data.success) {
        setBlogs(response?.data.data);
      }
    } catch (error) {
      const message = error?.response?.data?.message;
      toast.error(message || "Failed to fetch blogs");
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchCategory =
      selectedCategory === "All" || blog.category === selectedCategory;

    const matchSearch =
      blog.title?.toLowerCase().includes(search.toLowerCase()) ||
      blog.content?.toLowerCase().includes(search.toLowerCase()) ||
      blog.category?.toLowerCase().includes(search.toLowerCase()) ||
      blog.user?.name?.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <Navbar />
      <section className="bg-gray-50 min-h-screen px-4 mt-13 sm:px-6 lg:px-10 py-10">
        <div className="flex flex-row flex-wrap gap-6">
          <input
            type="text"
            placeholder="Search blog"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[90%] md:w-[30%] p-2 border border-red-500 rounded-md focus:outline-none"
          />
          {["All","education","food", "business", "technology", "travel", "fashion"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-lg cursor-pointer
              ${
                selectedCategory === cat
                  ? "bg-white text-red-600 border border-red-600"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <h1 className="text-2xl sm:text-3xl mt-10 font-bold text-red-600 text-center mb-10">
          {!blogs ? "Blogs Are not created" : "All Blogs"}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredBlogs.length === 0 && (
            <p className="text-gray-text-2xl sm:text-3xl font-bold text-red-600 text-center mb-10">
              No blogs found
            </p>
          )}
          {filteredBlogs?.map((blog) => (
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
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h2 className="text-lg sm:text-xl font-semibold">
                    {blog.title}
                  </h2>

                  <img
                    src={
                      blog.user?.profile ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="author"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                </div>

                <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3">
                  {blog.content}
                </p>

                <button
                  onClick={() => navigate(`/blogs/${blog._id}`)}
                  className="mt-auto cursor-pointer bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
                >
                  View Blog
                </button>

                <div className="flex justify-between items-center mt-2 text-gray-600 text-sm">
                  <p>{moment(blog.createdAt).format("DD MMM YYYY")}</p>
                  <p>Author - {blog.user?.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Blog;
