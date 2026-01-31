import express, { Router } from "express"
import { dashboard, getUser, googleLogin, login, passwordChange, register, update_Profile } from "../controllers/userControllers.js";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
const userRouter = express.Router();

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.post("/google-login",googleLogin)
userRouter.put("/update/profile",isAuth,upload.single("profile"),update_Profile)
userRouter.get("/profile",isAuth,getUser)
userRouter.put("/change-password",isAuth,passwordChange)
userRouter.get("/dashboard",isAuth,dashboard)

export default userRouter;