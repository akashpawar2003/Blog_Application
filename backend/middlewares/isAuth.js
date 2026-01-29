import jwt from "jsonwebtoken";
import User from "../models/User.js";

const isAuth = async(req,res,next) =>{
  try {
    const token = req.headers.authorization?.replace("Bearer ","");
    if(!token){
      return res
        .status(401)
        .json({ success: false, message: "Unauthorize Access" });
    }
    const decoded = jwt.verify(token,process.env.SECRETEKEY)
    if(!decoded){
      return res
        .status(400)
        .json({ success: false, message: "Users are not valid" });
    }
    const user = await User.findById(decoded.id)
    if(!user){
      return res
        .status(400)
        .json({ success: false, message: "User are not valid" });
    }
    req.user = user
    next()
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export default isAuth;