import React, { useContext, useState } from "react";
import AuthContext from "../context/Auth";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isLogout, isLogin, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const isProfilePage = location.pathname === "/profile";

  const submitHandler = () => {
    isLogout();
    navigate("/login");
    toast.success("Logged out successfully");
  };
  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800 cursor-pointer">
          <Link to="/">BlogApp</Link>
        </h1>

        <ul className="hidden md:flex space-x-8 text-lg font-medium text-gray-700">
          <Link to="/">
            <li className="hover:text-red-600 cursor-pointer">Home</li>
          </Link>
          <Link to="/blogs">
            <li className="hover:text-red-600 cursor-pointer">Blogs</li>
          </Link>
          <Link to="/contact">
            <li className="hover:text-red-600 cursor-pointer">Contact</li>
          </Link>
          <Link to="/about">
            <li className="hover:text-red-600 cursor-pointer">About</li>
          </Link>
        </ul>

        <div className="flex flex-row gap-2">
          {!isLogin() && (
            <button className="hidden md:block bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 cursor-pointer">
              <Link to="/login">Login</Link>
            </button>
          )}
          {!isProfilePage && isLogin() && (
            <button
              onClick={() => navigate("/profile")}
              className="hidden md:block bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 cursor-pointer"
            >
              Account
            </button>
          )}

          {isLogin() && (
            <button
              onClick={submitHandler}
              className="hidden md:block bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>

        <button
          className="md:hidden text-gray-800 ml-2 text-2xl cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {open ? <div>❌</div> : <div>☰</div>}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white shadow-md px-6 pb-4">
          <ul className="flex flex-col space-y-4 text-lg text-gray-700">
            <Link to="/">
              <li className="hover:text-red-600 cursor-pointer">Home</li>
            </Link>
            <Link to="/allblogs">
              <li className="hover:text-red-600 cursor-pointer">All Blogs</li>
            </Link>
            <Link to="/profile">
              <li className="hover:text-red-600 cursor-pointer">Profile</li>
            </Link>
            <Link to="/about">
              <li className="hover:text-red-600 cursor-pointer">About</li>
            </Link>
          </ul>

          <Link to="/login">
            <button className="mt-4 w-full cursor-pointer bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
              Log In
            </button>
          </Link>
          <Link to="/login">
            <button className="mt-4 w-full cursor-pointer bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
              LogOut
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
