import postModel from "../models/postModel.js"
import multer from "multer"
import { response } from "../util/controllersUtil.js"
import userModel from "../models/userModel.js"
const multerStorage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, "public/images")
    },
    filename : (req, file, cb) =>{
         const ext = file.mimetype.split("/")[1]
        const name = `${req.user.firstName}-${Date.now()}.${ext}`
        req.image = `/images/${name}`
        cb(null, name )
    }
})

const multerFilter = (req, file, cb) =>{
    if(file.mimetype.startsWith("image")){
        cb(null, true)
    }
    else {
        cb(new Error("d"), false)
    }
}
export const upload = multer({
    storage : multerStorage,
    fileFilter : multerFilter
})

export const uploadPostImage = upload.single("photo")






export const createPost = async (req, res) =>{
    const { body , user } = await req 
    console.log(body)
    const postData = {...body, user : user._id , image :  req.image ? req.image : ""  }
    const newPost = await postModel.create(postData)
    response(res, 201, {msg : newPost} )
}


export const deletePost = async (req, res) =>{
    const {  user } = await req 
    const {  id } = await req.params
 

    const deletedPost = await postModel.findOneAndDelete({user : user._id,  _id : id })
    response(res, 200 , {
        msg : deletedPost
    })

}


export const updatePost =  async (req, res) =>{
    const { user, body } = await req 
    const {  id } = await req.param 
    const updatedPost = await postModel.findOneAndUpdate({user : user._id, id : id } , {text : body.text})
    response(res, 200 , {
        msg : updatedPost
    })
}


export const getAllPosts = async (req, res) => {
    const { param } = await req
    const posts = await postModel.find({user : param.id}).sort({createdAt : -1})
    response(res, 200, {
        posts : posts
    })
}

export const timelinePosts = async (req, res ) =>{
    const user = await userModel.findById(req.params.id)
    const friendsPosts = await postModel.find({user : {$in : user.following }}).sort({createdAt : -1}).populate({
        path : "user",
        select : "firstName -_id"
    })
    response(res, 200, friendsPosts)

}


export const reactPost = async (req, res) =>{
    const {user ,  params } = req
    const post = await postModel.findById(params.id)
    if (!post.likes.includes(user.id)){
        await post.updateOne({ $push: { likes : user.id } })
        response(res, 200, {msg: "like post "})
    }
    else if (post.likes.includes(user.id)) {
        await post.updateOne({ $pull: { likes : user.id } })
        response(res, 200, {msg: "dislike post "})

    }
    
}
 