import notificationModel from "../models/notificationModel";
 


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

}