import express from "express"
import { add_Comment, get_Comment } from "../controllers/commentControllers.js";
import isAuth from "../middlewares/isAuth.js";

const commentRouter = express.Router();

commentRouter.post("/add",isAuth,add_Comment);
commentRouter.get("/get/:id",get_Comment);

export default commentRouter;