import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import SingleBlog from "./pages/SingleBlog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/admin/Profile";
import MyBlogs from "./pages/admin/MyBlogs";
import Favourites from "./pages/admin/Favourites";
import ChangePassword from "./pages/admin/ChangePassword";
import NotFound from "./pages/NotFound";
import toast, { Toaster } from 'react-hot-toast';
import RequireAuth from "./context/RequireAuth";
import GuestRoute from "./context/GuestRoute";
import AddBlog from "./pages/admin/AddBlog";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Update from "./pages/admin/Update";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs/:id" element={<SingleBlog />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
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
            
          <Route path="/profile/save-blogs" element={<Favourites />} />
          <Route path="/profile/change-password" element={<ChangePassword />} />
          <Route path="/*" element={<NotFound />} />
          
        </Routes>
      </BrowserRouter>
      <Toaster/>
    </>
  );
};

export default App;
