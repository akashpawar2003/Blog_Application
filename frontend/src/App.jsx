import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Blog from "./pages/Blog";
import SingleBlog from "./pages/SingleBlog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/admin/Profile";
import MyBlogs from "./pages/admin/MyBlogs";
import ChangePassword from "./pages/admin/ChangePassword";
import NotFound from "./pages/NotFound";
import { Toaster } from 'react-hot-toast';
import RequireAuth from "./context/RequireAuth";
import GuestRoute from "./context/GuestRoute";
import AddBlog from "./pages/admin/AddBlog";
import Update from "./pages/admin/Update";
import Dashboard from "./pages/admin/Dashboard";
import Home from "./pages/Home"
import Favourite from "./pages/admin/Favourite";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs/:id" element={<SingleBlog />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/login" element={
            <GuestRoute>
              <Login />
            </GuestRoute>} />
          <Route path="/register" element={
            <GuestRoute>
              <Register />
            </GuestRoute>} />
          <Route path="/profile/addblog" element={
            <RequireAuth>
              <AddBlog />
            </RequireAuth>} />
          <Route path="/profile" element={
            <RequireAuth>
              <Profile />
            </RequireAuth>} />
          <Route path="/profile/my-blogs" element={
            <RequireAuth>
              <MyBlogs />
            </RequireAuth>} />
          <Route path="/profile/blog-update/:id" element={
            <RequireAuth>
              <Update />
            </RequireAuth>} />
          <Route path="/profile/change-password" element={
            <RequireAuth>
              <ChangePassword />
            </RequireAuth>} />
          <Route path="/profile/dashboard" element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>} />
          <Route path="/profile/favourite" element={
            <RequireAuth>
              <Favourite />
            </RequireAuth>} />
          <Route path="/*" element={<NotFound />} />         
        </Routes>
      </BrowserRouter>
      <Toaster/>
    </>
  );
};

export default App;
