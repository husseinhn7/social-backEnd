import { Router } from "express";
import { follow, unfollow } from "../controllers/userControllers.js";
import { authOnly } from "../middleware/protected.js";




const userRouter = Router()



userRouter.route("/")
.get()




userRouter.route("/follow/:id")
.put(authOnly, follow)

userRouter.route("/unfollow/:id")
.put(authOnly, unfollow)





export default userRouter