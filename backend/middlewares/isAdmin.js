import jwt from "jsonwebtoken";
import User from "../models/User.js";

const isAdmin = async(req,res,next) =>{
  try {
    const token = req.cookies.token

    if(!token){
      return res
        .status(401)
        .json({ success: false, message: "Token not found" });
    }
    const decoded = jwt.verify(token,process.env.SECRETEKEY)
    if(!decoded){
      return res
        .status(400)
        .json({ success: false, message: "Token are not valid" });
    }
    const user = await User.findById(decoded.id)
    if(!user){
      return res
        .status(400)
        .json({ success: false, message: "User are not valid" });
    }
    if(user.role != 'admin'){
      return res
        .status(400)
        .json({ success: false, message: "You are not admin" });
    }
    req.user = user
    next()
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export default isAdmin;