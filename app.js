import express from "express";
import dotenv from "dotenv"
dotenv.config({path : "./enf.conf"})
import morgan from "morgan"



const app = express()
app.use(express.json())
app.use(morgan("dev"))
app.use(express.static("./public"))






















export default app