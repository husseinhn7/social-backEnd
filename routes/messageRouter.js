import { Router } from "express";
import { authOnly } from "../middleware/protected.js";
import { getMessages, createMessage } from "../controllers/messageController.js";

const messageRouter = Router()


messageRouter.route("/")
.post(authOnly, createMessage)

messageRouter.route("/:id")
.get(authOnly,  getMessages)


export default messageRouter