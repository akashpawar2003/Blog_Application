import Comment from "../models/Comment.js";

export const add_Comment = async(req,res)=>{
  try {
    const {blogId,comment} = req.body;
    const userId = req.user?._id;
    if(comment.trim() === ""){
      return res
        .status(400)
        .json({ success: false, message: "Comment field is Required" });
    }
    const newComment = await Comment.create({blogId,userId,comment})
    const latestComment = await Comment.findById(newComment._id).populate("userId","-password")
    return res
        .status(200)
        .json({ success: true, message: "add comment Succesfully",data:latestComment });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export const get_Comment = async(req,res)=>{
  try {
    const {id} = req.params;
    const comments = await Comment.find({blogId:id}).populate("userId","-password").sort({createdAt:-1})
    return res
        .status(200)
        .json({ success: true, message: "get comment Succesfully",data:comments });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}