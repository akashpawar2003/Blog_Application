import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    profile: {
      type: String,
    },
    profilePublicId: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    location: {
      type: String,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
