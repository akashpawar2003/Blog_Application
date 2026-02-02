import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DBURI);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error( error.message);
  }
};

export default connectDB;
