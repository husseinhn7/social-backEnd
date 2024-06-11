import { Router } from "express";
import { authOnly } from "../middleware/protected.js";
import { getNotifications } from "../controllers/notificationController.js";


const notificationRouter = Router()



notificationRouter.route("/")
.get(authOnly,getNotifications)

// .post(authOnly, )



export default notificationRouter