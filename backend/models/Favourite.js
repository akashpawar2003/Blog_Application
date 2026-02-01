import mongoose from "mongoose";

const favSchema = new mongoose.Schema({
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      required:true,
      ref: "Blog",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required:true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Favourite = mongoose.model("Favourite", favSchema);

export default Favourite;
