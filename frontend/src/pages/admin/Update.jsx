import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [blogImage, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [blogs, setBlogs] = useState();

  const navigate = useNavigate();

  const { id } = useParams();
  const fetchBlog = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/blog/single/${id}`,
      );
      setBlogs(response.data.data);
    } catch (error) {
      console.log(error);
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

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("blogImage", blogImage);

    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:5000/blog/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(res.data.message);
      setTitle("");
      setContent("");
      setCategory("");
      setImage(null);
      setPreview(null);
      navigate("/profile/my-blogs");
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  useEffect(() => {
    if (blogs) {
      setTitle(blogs.title || "");
      setContent(blogs.content || "");
      setCategory(blogs.category || "");
      setPreview(blogs.blogImage || null);
    }
  }, [blogs]);

  return (
    <section className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-8">
      <Link
        to="/profile"
        className="inline-block bg-red-600 text-white mb-4 px-4 sm:px-3 lg:px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
      >
        Go Back Profile
      </Link>
      <h1 className="text-2xl sm:text-3xl font-bold text-red-600 mb-8">
        Update Blog
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl bg-white rounded-xl shadow-md p-6 sm:p-8"
      >
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            Blog Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter blog title"
            className="cursor-pointer w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            Blog Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full cursor-pointer border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select Category</option>
            <option value="education">Education</option>
            <option value="technology">Technology</option>
            <option value="business">Business</option>
            <option value="fashion">Fashion</option>
            <option value="travel">Travel</option>
          </select>
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            Blog Description
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="3"
            placeholder="Write blog description..."
            className=" cursor-pointer w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Blog Image
          </label>

          <input
            type="file"
            accept="image/*"
            name="blogImage"
            onChange={handleImageChange}
            className="cursor-pointer block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-red-50 file:text-red-600
              hover:file:bg-red-100"
          />

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-4 h-48 w-full object-cover rounded-lg border"
            />
          )}
        </div>
        <button className="cursor-pointer bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </section>
  );
};

export default Update;
