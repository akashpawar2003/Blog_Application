import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { auth, provider } from "../context/firebase";
import { signInWithPopup } from "firebase/auth";
import AuthContext from "../context/Auth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [gloading, gsetLoading] = useState(false);
  const { login, user } = useContext(AuthContext);

  const navigate = useNavigate();

  const googleLogin = async () => {
    gsetLoading(true);
    try {
      const googleResponse = await signInWithPopup(auth, provider);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/google-login`,
        {
          email: googleResponse.user.email,
          name: googleResponse.user.displayName,
          profile: googleResponse.user.photoURL,
        },
      );
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        login(response.data.token);
        toast.success(response.data.message);
        navigate("/profile");
      }
    } catch (error) {
      const message = error?.response?.data?.message;
      console.log(error);
      toast.error(message);
    } finally {
      gsetLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/register`, {
        name,
        email,
        password,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setEmail("");
        setName("");
        setPassword("");
        navigate("/login");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center mt-15 bg-red-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          Register Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <button
            onClick={googleLogin}
            type="button"
            className=" cursor-pointer flex items-center justify-center gap-3 w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700 font-medium hover:bg-gray-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            {gloading ? "Please Wait..." : "Continue with Google"}
          </button>
          <hr className="text-gray-700" />
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              value={email}
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              name="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
          >
            {loading ? "Please Wait..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-5">
          You Already registered{" "}
          <Link
            to="/login"
            className="text-red-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
