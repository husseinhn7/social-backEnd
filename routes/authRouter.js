// import { Router } from "express";
import express from "express";
import { register, forgetPassword, restPassword, login } from "../controllers/authController.js";
import { authOnly } from "../middleware/protected.js"

const authRouter = express.Router()



authRouter
.post("/register", register)
.post("/login", login)
.post("/forgotPassword", forgetPassword)
.post("/restPassword", restPassword)





export default authRouter