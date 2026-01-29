import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    unique:true,
    required:true
  },
  profile:{
    type:String,
  },
  profilePublicId:{
    type:String,
  },
  password:{
    type:String,
    required:true
  },
  token: {
    type: String,
    default: null,
  },
  bio:{
    type:String,
  },
  location:{
    type:String,
  },
  role:{
    type:String,
    enum:["admin","user"],
    default:"user"     
  }
},{timestamps:true})

const User = mongoose.model("User",userSchema); 

export default User;