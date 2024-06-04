import commentModel from "../models/commentModel.js"
import { response } from "../util/controllersUtil.js"





export const addComment = async (req, res) =>{
    const { user, body } = await req
    console.log(body)
    const comment = await commentModel.create({user : user._id, ...body})
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



