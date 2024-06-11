import commentModel from "../models/commentModel.js"
import { response } from "../util/controllersUtil.js"
import { getSocket, socketEmit } from "../socket.js"
import postModel from "../models/postModel.js"
import notificationModel from "../models/notificationModel.js"



export const addComment = async (req, res) =>{
    const { user, body } = await req
    const comment = await commentModel.create({user : user._id, ...body})
    const post = await postModel.findById(body.post)
    const name = `${user.firsName} ${user.lastName} `
    const action = `${name} commented on your post`
    const note = await notificationModel.create({sender: user._id, receiver: post.user._id , action : action})
    const socketId = getSocket(post.user._id.toString())
    if(socketId) {
        socketEmit(socketId, "comment", note )
    }

     if (comment){
        // socketServer.emit()
     }
    response(res, 201, {
        comment : comment 
    })
} 


export const deleteComment = async (req, res) =>{
    const { user, params } = await req
    const comment = await commentModel.findOneAndDelete({user : user._id, id : params.id })
    response(res, 201, {
        comment : comment 
    })
}



export const updateComment = async (req, res) =>{
    const { user, params } = await req
    const comment = await commentModel.findOneAndDelete({user : user._id, id : params.id })
    response(res, 201, {
        comment : comment 
    })
}


export const getAllComments = async (req, res) =>{
    const { params } = await req
    const comments = await commentModel.find({post : params.postId})
    response(res, 200, {
        comments : comments
    })
}



