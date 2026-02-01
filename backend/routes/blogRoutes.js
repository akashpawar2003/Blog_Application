import express from "express"
import {upload} from "../middlewares/multer.js";
import { addToFavourite, all_Blog, create_Blog, delete_Blog, favouriteCount, generateContent, get_Blog, getFavouriteBlogs, getUserBlog, update_Blog } from "../controllers/blogControllers.js";
import isAuth from "../middlewares/isAuth.js";

const blogRouter = express.Router();

blogRouter.post("/create",isAuth,upload.single("blogImage"),create_Blog)
blogRouter.delete("/delete/:id",isAuth,delete_Blog);
blogRouter.get("/allblogs",all_Blog);
blogRouter.get("/myblogs",isAuth,getUserBlog);
blogRouter.put("/update/:id",isAuth,upload.single("blogImage"),update_Blog);
blogRouter.get("/single/:id",get_Blog);
blogRouter.post("/favourite",isAuth,addToFavourite);
blogRouter.get("/favourite/count/:blogId",favouriteCount);
blogRouter.get("/favourite/blogs",isAuth,getFavouriteBlogs);
blogRouter.post("/generate",isAuth,generateContent);



export default blogRouter;