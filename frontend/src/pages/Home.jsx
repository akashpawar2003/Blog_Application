import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/Auth";

const Home = () => {
  const { isLogin } = useContext(AuthContext);
  return (
    <>
      <section className="w-full bg-gray-50 py-20 px-6 mt-15 md:px-16">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-4 py-1 mb-6 text-sm font-medium text-red-600 bg-red-100 rounded-full">
            🚀 New AI feature integrated
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            Welcome to <span className="text-red-600">BlogApp</span>
          </h1>

          <p className="mt-5 text-gray-600 text-base sm:text-lg">
            Write smarter, faster, and without limits. Let AI help you generate
            ideas, improve content, and bring your thoughts to life.
          </p>

          <div className="flex justify-center gap-4 mt-6">
            <Link to="/blogs">
              <button className="px-6 py-3 cursor-pointer bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition">
                Explore Blogs
              </button>
            </Link>
            {!isLogin() && (
              <Link to="/login">
                <button className="px-6 py-3 cursor-pointer bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition">
                  Login
                </button>
              </Link>
            )}
          </div>

          <div className="mt-12 bg-white shadow-md rounded-2xl p-6 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Why BlogApp?
            </h3>
            <p className="text-gray-700">
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                Discover trending blogs, read meaningful stories, explore new
                topics, and stay updated with fresh articles written by me.
              </p>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
