import mongoose from "mongoose";

const db = async(req,res) => {
  try {
    await mongoose.connect(process.env.DBURI)
    console.log("Database Connected succesFully")
  } catch (error) {
    return error
  }
}
export default db;