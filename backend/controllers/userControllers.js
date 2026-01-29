import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { uploadCloudinary } from "../middlewares/cloudiniary.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill Required field " });
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        success: false,
        message: `You Are Already Register`,
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
    });
    return res.status(201).json({
      success: true,
      message: `You are Register successfully `,
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password Required" });
    }
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res
        .status(400)
        .json({ success: false, message: "You are Not Register" });
    }
    const comparePassword = await bcrypt.compare(password, existUser.password);
    if (!comparePassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = await jwt.sign(
      { id: existUser._id },
      process.env.SECRETEKEY,
      {
        expiresIn: "3d",
      },
    );
    await User.findByIdAndUpdate(existUser._id, { token }, { new: true });
    return res.status(200).json({
      success: true,
      message: "Welcome to Our Application",
      data: existUser,
      token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const update_Profile = async (req, res) => {
  try {
    const { name, bio, location } = req.body;
    const userId = req?.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const updateData = {
      name,
      bio,
      location,
    };

    if (req.file) {
      const filePath = req.file.path;
      const uploadResult = await uploadCloudinary(filePath);

      updateData.profile = uploadResult.url;
      updateData.profilePublicId = uploadResult.public_id;
    }

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Your profile updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getUser = async (req, res) => {
  try {
    const userId = req?.user?._id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    const user = await User.findById(userId).select("-password");
    return res.status(200).json({
      success: true,
      message: "Your profile get SuccesFully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const passwordChange = async (req, res) => {
  try {
    const user = req?.user?._id
    const existUser = await User.findOne(user);
    if (!existUser) {
      return res
        .status(400)
        .json({ success: false, message: "Users Are not found" });
    }
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Old password Required" });
    }    
    const comparePassword = await bcrypt.compare(oldPassword, existUser.password);
    if (!comparePassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid Old password",
      });
    }

    if (!newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "New password Required" });
    } 
    const hashPassword = await bcrypt.hash(newPassword,10);

    existUser.password = hashPassword;
    await existUser.save()
    return res.status(200).json({
      success: true,
      message: "Password changed SuccesFully",
      data: existUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};