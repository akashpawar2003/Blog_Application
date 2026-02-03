import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import moment from "moment";
import toast from "react-hot-toast";
import { BsHeart } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";

const SingleBlog = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const token = localStorage.getItem("token");

  const { id } = useParams();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!token) {
      setComment("");
      toast.error("You are not Login,Please login");
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/comment/add`,
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

  const handleLike = async () => {
  if (!token) {
    toast.error("You are not Login, Please Login");
    return;
  }

  setLoading(true);
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/blog/favourite`,
      { blogId: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const newLiked = res.data.data.isFavourite;

    setLiked(newLiked);
    setLikeCount(prev =>
      newLiked ? prev + 1 : prev - 1
    );

    toast.success(res.data.message);
  } catch (error) {
    toast.error(error.response?.data?.message || "Upload failed");
  } finally {
    setLoading(false);
  }
};


  const getLike = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/blog/favourite/count/${id}`,
      );
      setLikeCount(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlog = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/blog/single/${id}`,
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
        `${import.meta.env.VITE_BASE_URL}/api/comment/get/${id}`,
      );
      setComments(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlog();
    fetchComments();
    getLike();
  }, [id]);

  return (
    <>
      <Navbar />

      <section className="bg-gray-50 min-h-screen mt-20 px-4 py-8">
        <Link
          to="/blogs"
          className="inline-block bg-red-600 text-white mb-4 px-4 sm:px-3 lg:px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Go Back
        </Link>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
          <img
            src={blogs?.blogImage}
            alt="blog"
            className="w-full h-64 object-cover"
          />

          <div className="p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">
              {blogs?.title}
            </h1>

            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-500">
                <p>{moment(blogs?.createdAt).format("DD MMM YYYY")}</p>
                <p className="mt-1">By {blogs?.user?.name}</p>
              </div>

              <img
                src={blogs?.user?.profile || "/user.png"}
                alt="author"
                className="w-12 h-12 rounded-full object-cover border"
              />
            </div>

            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {blogs?.content}
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-8 bg-white rounded-xl shadow-sm p-6 sm:p-8">
          <h2 className="text-xl font-semibold mb-4">Comments</h2>

          <form onSubmit={submitHandler} className="mb-6">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment..."
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
              rows="4"
            />
            <div className="flex flex-wrap justify-between">
              <button className=" cursor-pointer mt-3 bg-red-600 mb-10 text-white px-5 py-2 rounded hover:bg-red-700 transition">
                Post Comment
              </button>
              <div>
                {!liked ? <BsHeart
                  onClick={handleLike}
                  className="mt-2 cursor-pointer h-10 w-10"
                /> :
                <BsHeartFill
                  onClick={handleLike}
                  className="mt-2 fill-red-700 cursor-pointer h-10 w-10"
                />}
                <p className="text-gray-700">{likeCount}</p>
              </div>
            </div>
          </form>

          <div className="space-y-4">
            {comments?.map((comment) => (
              <div
                key={comment?._id}
                className="border rounded-lg p-4 bg-gray-50 flex gap-3"
              >
                <img
                  src={
                    comment?.userId?.profile ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="user"
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div className="flex-1">
                  <p className="font-medium">{comment?.comment}</p>

                  <div className="text-sm text-gray-500 mt-2">
                    <span>{comment?.userId?.name}</span>
                    <span className="mx-2">•</span>
                    <span>
                      {moment(comment?.createdAt).format("DD MMM YYYY")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleBlog;
