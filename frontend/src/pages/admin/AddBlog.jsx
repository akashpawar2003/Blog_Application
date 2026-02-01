import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const AddBlog = () => {
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [blogImage, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [gloading, gsetLoading] = useState(false);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const generateContent = async () => {
    try {
      gsetLoading(true);
      if(!title){
        toast.error("title is required")
        return
      }
      if(!category){
        toast.error("category is required")
        return
      }
      const res = await axios.post(
        "http://localhost:5000/blog/generate/",
        { prompt: title,category:category},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setContent(res.data.data);
      
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      gsetLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!blogImage || !title || !content || !category) {
      toast.error("All field Required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("blogImage", blogImage);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/blog/create",
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

  return (
    <section className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-red-600 mb-8">
        Create Blog
      </h1>

      <Link
        to="/profile"
        className="inline-block bg-red-600 text-white mb-4 px-4 sm:px-3 lg:px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
      >
        Go Back profile
      </Link>

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
            <option value="food">Food</option>
          </select>
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            Blog Description
            <button disabled={gloading} onClick={generateContent} className="ml-3 cursor-pointer bg-red-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition">
              {gloading ? "Generating..." : "Generate with AI ✨"}
            </button>
          </label>
          <textarea
            value={gloading ? "Waiting..." : (content)}
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
          {loading ? "Uploading..." : "Publish Blog"}
        </button>
      </form>
    </section>
  );
};

export default AddBlog;
