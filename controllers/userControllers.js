import userModel from "../models/userModel.js"
import { response } from "../util/controllersUtil.js"

export const follow = async (req, res) =>{
    const user = await req.user
    const currentUser = await userModel.findById(user.id)
    const userToFollow = await userModel.findById(req.params.id)
   

    if(!userToFollow?.followers.includes(user.id)){
        await userToFollow.updateOne({ $push: { followers: user.id } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
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

