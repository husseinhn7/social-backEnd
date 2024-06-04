import { Router } from "express";
import { authOnly } from "../middleware/protected.js";
import { addComment, deleteComment, updateComment, getAllComments } from "../controllers/commentController.js";



const commentRouter = Router()


commentRouter.route("/")
.post( authOnly,  addComment)


commentRouter.route("/:id")
.delete( authOnly, deleteComment)
.patch(authOnly, updateComment)



commentRouter.route("/:postId")
.get(authOnly, getAllComments)




export default commentRouter

