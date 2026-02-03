import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import commentRouter from "./routes/commentRoutes.js";
import connectDB from "./middlewares/db.js";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://blog-application-beryl-nu.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);


app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.use("/comment", commentRouter);

app.get("/", (req, res) => {
  res.send(`routing is working ${1000 * 20}`);
});

// app.listen(process.env.PORT, () => {
//   console.log(`server is listening on ${process.env.PORT}`);
//   connectDB();
// });
export default app;
