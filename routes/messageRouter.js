import { Router } from "express";
import { authOnly } from "../middleware/protected.js";
import { getMessages, createMessage } from "../controllers/messageController.js";

const messageRouter = Router()


messageRouter.route("/")
.get(authOnly,  getMessages)
.post(authOnly, createMessage)



export default messageRouter