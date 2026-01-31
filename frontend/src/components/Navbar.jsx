import React, { useContext, useState } from "react";
import AuthContext from "../context/Auth";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isLogout, isLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const isProfilePage = location.pathname === "/profile";

  const submitHandler = () => {
    if (!window.confirm("Are you sure you want to LogOut?")) return;
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

        <div className="flex flex-row gap-2">
          {!isLogin() && (
            <button className="px-2 py-1 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 cursor-pointer">
              <Link to="/login">Login</Link>
            </button>
          )}
          {!isProfilePage && isLogin() && (
            <button
              onClick={() => navigate("/profile")}
              className=" bg-red-600 text-white px-2 py-1 rounded-lg hover:bg-red-700 cursor-pointer"
            >
              Account
            </button>
          )}

          {isLogin() && (
            <button
              onClick={submitHandler}
              className=" bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
