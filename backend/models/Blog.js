import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    blogImage:{
      type:String,
    },
    status: {
      type: String,
      enum: ["active","unactive"],
      default:"active"
    },
    isFeatured: {
      type: String,
      enum: ["yes","no"],
      default:"no"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
