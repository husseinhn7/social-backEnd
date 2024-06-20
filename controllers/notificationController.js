import notificationModel from "../models/notificationModel.js";
import { response } from "../util/controllersUtil.js";


export const createNotification = async (req, res) =>{
    const actionsList = {
        "like"    : "",
        "follow"  : "",
        "comment" : ""
    }
    const {user, body} = req
    const name = `${user.firstName} ${user.lastName}`
    const action = `${name} ${actionsList[body.action]}`
    const notification = await notificationModel.create(body)
 }


export const getNotifications = async (req, res) =>{
    const {user} = req
    const notifications = await notificationModel.find({receiver : user._id }).sort({dateCreated:-1}).populate({
        path : "sender",
        select : "firstName lastName personalImage"
    })

    response(res, 200, notifications)

}