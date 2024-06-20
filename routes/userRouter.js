import { Router } from "express";
import { follow, unfollow, getAllFollowers, getAllFollowing, updateMe , updateProfileImage } from "../controllers/userControllers.js";
import { authOnly } from "../middleware/protected.js";





const userRouter = Router()



userRouter.route("/")
.get()


userRouter.route("/follow/:id")
.put(authOnly, follow)

userRouter.route("/unfollow/:id")
.put(authOnly, unfollow)


userRouter.route("/followers")
.get(authOnly, getAllFollowers)


userRouter.route("/following")
.get(authOnly, getAllFollowing)



userRouter.route("/updateMe")
.patch(authOnly, updateProfileImage, updateMe)





export default userRouter