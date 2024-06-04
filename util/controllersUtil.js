export const response = (res, statusCode, content) =>{
    res.status(statusCode).json(
        content
    )

}