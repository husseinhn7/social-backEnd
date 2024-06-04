import { Router } from "express";
import { createPost, reactPost  } from "../controllers/postController.js";
import { authOnly } from "../middleware/protected.js";
import { uploadPostImage, deletePost, updatePost, getAllPosts, timelinePosts  } from "../controllers/postController.js";

const postRouter = Router()

postRouter.route("/")
.post( authOnly, uploadPostImage, createPost)
.get(getAllPosts)

postRouter.route("/:id")
.get(authOnly, timelinePosts)
.delete( authOnly, deletePost)
.patch( authOnly, updatePost)
.post(  authOnly, reactPost )


postRouter.route("/:idP")


export default postRouter