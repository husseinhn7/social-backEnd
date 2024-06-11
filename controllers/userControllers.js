import userModel from "../models/userModel.js"
import { response } from "../util/controllersUtil.js"
import { loginToken } from "./authController.js"
import multer from "multer"
import { unlink } from "fs"
import notificationModel from "../models/notificationModel.js"
import { getSocket, socketEmit } from "../socket.js"



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

export const updateProfileImage = upload.single("personalImage")





export const follow = async (req, res) =>{
    const user = await req.user
    const currentUser = await userModel.findById(user.id)
    const userToFollow = await userModel.findById(req.params.id)
   

    if(!userToFollow?.followers.includes(user.id)){
        await userToFollow.updateOne({ $push: { followers: user.id } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        const name = `${currentUser.firstName} ${currentUser.lastName}`
        const action  = `${name} started following you`
        const note = await notificationModel.create({sender : currentUser._id , receiver : userToFollow._id , action : action})
        const socketId = getSocket(userToFollow._id.toString())
        if(socketId){
            socketEmit(socketId, "follow", note )
        }
        response(res, 201, {msg : "user has been followed"})
    }
}


export const unfollow = async (req, res) =>{
    const user = await req.user
    const currentUser = await userModel.findById(user.id)
    const userToFollow = await userModel.findById(req.params.id)
   

    if(serToFollow?.followers.includes(user.id)){
        await userToFollow.updateOne({ $pull: { followers: user.id } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        response(res, 201, {msg : "user has been unfollowed"})
    }

}




export const getAllFollowers = async (req, res) =>{
    const {user} = req
    const followers = await userModel.findById(user._id).populate({
        path : "user",
        select : "firstName -_id"
    }).followers
    response(res, 200, followers)

}


export const getAllFollowing = async (req, res) =>{
    const {user} = req
    const following = await userModel.findById(user._id).populate({
        path : "user",
        select : "firstName -_id"
    }).followers
    response(res, 200, following)
}


export const getProfile = (req, res) =>{


}

const updatePassword = async (res, body, userObj) =>{
    const user = await userModel.findById(userObj._id).select("+password")
     

    if(user && (await user.correctPassword(body.password, user.password))){
    user.password = body.newPassword 
    user.confirmPassword = body.confirmNewPassword
 
    await user.save( )
     const token = loginToken(userObj)
    return response(res, 200, {
        user : user,
        token : token 
    }) 
}

response(res, 404, {
    user : "user not found"
}) 



}
export const updateMe = async (req, res) =>{
    const {user, body} = req
     if(body.personalImage){
            body.personalImage = req.image
    }
    if (body.password && body.newPassword && body.confirmNewPassword){
        return await updatePassword(res, body, user)
    }
    const updatedUser = await userModel.findOneAndUpdate({_id : user._id} , {...body, personalImage : req.image}, {
    })

    response(res, 200, {
        user: updatedUser
    })
    

}