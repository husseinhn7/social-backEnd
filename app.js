import express from "express";
import dotenv from "dotenv"
dotenv.config({path : "./enf.conf"})
import morgan from "morgan"
import authRouter from "./routes/authRouter.js";
import postRouter from "./routes/postRouter.js";
import commentRouter from "./routes/commentRoute.js";
import userRouter  from "./routes/userRouter.js";
import cors from "cors"





const app = express()


app.use(express.json({limit: '50mb'}))
app.use(morgan("dev"))
app.use(express.static("public"))
app.use(cors({
    origin : "http://localhost:3000"
}))



app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/post", postRouter)
app.use("/api/comment", commentRouter)






















export default app