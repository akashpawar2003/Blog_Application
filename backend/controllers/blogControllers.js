import Blog from "../models/Blog.js";
import { uploadCloudinary } from "../middlewares/cloudiniary.js";
import Favourite from "../models/Favourite.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
import main from "../middlewares/gemini.js";

export const create_Blog = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const uploadResult = await uploadCloudinary(req.file.buffer);

    if (!title || !content || !category) {
      return res
        .status(400)
        .json({ success: false, message: "All field Required" });
    }

    const newBlog = await Blog.create({
      title,
      content,
      category,
      blogImage: uploadResult.url,
      user: req?.user?._id,
    });
    return res
      .status(201)
      .json({
        success: true,
        message: "Blog Created successfully",
        data: newBlog,
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const update_Blog = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      const uploadResult = await uploadCloudinary(req.file.buffer);
      updateData.blogImage = uploadResult.url;
    }
    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return res
      .status(200)
      .json({
        success: true,
        message: "Blog updated successfully",
        data: updatedBlog,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const delete_Blog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Blog not Found" });
    }
    await Favourite.deleteMany({ blogId: id });
    await Comment.deleteMany({ blogId: id });
    await Blog.findByIdAndDelete(id);
    return res.status(201).json({
      success: true,
      message: "Blog Delete successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const all_Blog = async (req, res) => {
  try {
    const allBlog = await Blog.find()
      .populate("user", "-password")
      .sort({ createdAt: -1 });
    if (!allBlog) {
      return res
        .status(400)
        .json({ success: false, message: "Blogs are not created" });
    }
    return res.status(201).json({
      success: true,
      message: "Blog get successfully",
      data: allBlog,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};



export const get_Blog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "This blog not Found" });
    }
    const getBlog = await Blog.findById(id).populate("user", "-password");
    if (!getBlog) {
      return res
        .status(400)
        .json({ success: false, message: "This blog not Found" });
    }
    return res.status(201).json({
      success: true,
      message: "Blog get by id successfully",
      data: getBlog,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserBlog = async (req, res) => {
  try {
    const user = req?.user?._id;

    const myBlogs = await Blog.find({ user: user }).sort({ createdAt: -1 });

    if (myBlogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blogs found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      message: "My blogs fetched successfully",
      data: myBlogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addToFavourite = async (req, res) => {
  try {
    const userId = req?.user?._id;
    const { blogId } = req.body;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const favourite = await Favourite.findOne({
      userId,
      blogId,
    });

    let message = "";
    let isFavourite = true;

    if (!favourite) {
      await Favourite.create({ userId, blogId });
      message = "Blog added to favourites successfully";
      isFavourite = true;
    } else {
      await Favourite.deleteOne({ userId, blogId });
      message = "Blog removed from favourites successfully";
      isFavourite = false;
    }
    const favouriteCount = await Favourite.countDocuments({ blogId });

    return res.status(200).json({
      success: true,
      message,
      data: { isFavourite, favouriteCount },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const favouriteCount = async (req, res) => {
  try {
    const { blogId } = req.params;
    const favouriteCount = await Favourite.countDocuments({ blogId });

    return res.status(200).json({
      success: true,
      message: "Get Counts SuccesFully",
      data: favouriteCount,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getFavouriteBlogs = async (req, res) => {
  try {
    const userId = req?.user?._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const blogs = await Favourite.find({ userId }).populate({
      path: "blogId",
      populate: {
        path: "user",
        model: "User",
      },
    });

    if (!blogs) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Favourite Blogs",
      data: blogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const generateContent = async (req, res) => {
  try {
    const { prompt, category } = req.body;
    const content = await main(
      prompt +
        category +
        "its My category" +
        "Generate a blog content about my title and category in simple 60 words only information and details"
    );
    return res.status(200).json({
      success: true,
      message: "Get Content by Chat Gpt",
      data: content,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
