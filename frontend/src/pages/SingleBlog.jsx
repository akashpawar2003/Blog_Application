import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import moment from "moment";
import toast from "react-hot-toast";

const SingleBlog = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const token = localStorage.getItem("token");
  const [liked, setLiked] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const handleToggle = () => {
    setLiked(!liked);
  };

  const submitHandler = async (e) => {
    setLoading(true);
    if (!token) {
      toast.error("You are not Login");
      navigate("/login");
      return;
    }
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/comment/add",
        { blogId: id, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(res.data.message);
      setComment("");
      fetchComments();
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchBlog = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/blog/single/${id}`,
      );
      setBlogs(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/comment/get/${id}`,
      );
      setComments(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, [id]);

  return (
    <>
      <Navbar />
      <section className="bg-gray-50 min-h-screen mt-20 px-4 sm:px-6 lg:px-10 py-8">
        <Link
          to="/blogs"
          className="inline-block bg-red-600 text-white mb-4 px-4 sm:px-3 lg:px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Go Back Home
        </Link>
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <img
            src={blogs?.blogImage}
            alt="blog"
            className="w-full h-56 sm:h-72 lg:h-80 object-cover"
          />

          <div className="p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-red-600 mb-4">
              {blogs?.title}
            </h1>

            <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
              {blogs?.content}
            </p>
            <button
              onClick={handleToggle}
              className={`px-4 py-2 rounded-md border transition-colors duration-200 ${
                liked
                  ? "bg-red-600 text-white"
                  : "bg-white text-red-600 border-red-600"
              }`}
            >
              {liked ? "❤️" : " 🤍"}
            </button>
            <div className="flex flex-row text-gray-600 text-sm sm:text-base mt-1 line-clamp-3">
              {moment(blogs?.createdAt).format("DD MMM YYYY")}{" "}
              <div className="ml-140">by- {blogs?.user?.name}</div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-md p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Comments</h2>

          <form onSubmit={submitHandler} className="mb-6">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment..."
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
              rows="4"
            />
            <button className="cursor-pointer mt-3 bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition">
              Post Comment
            </button>
          </form>

          <div className="space-y-4">
            {comments?.map((comment) => (
              <div
                key={comment?._id}
                className="border rounded-lg p-4 bg-gray-50"
              >
                <h4 className="font-semibold text-sm sm:text-base">
                  {comment?.comment}
                </h4>
                <p className="text-gray-600 text-sm sm:text-base mt-1">
                  {comment.userId.name}
                </p>
                <p className="text-gray-600 text-sm sm:text-base mt-1">
                  {moment(comment?.userId.createdAt).format("DD MMM YYYY")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleBlog;
