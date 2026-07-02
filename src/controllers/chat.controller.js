const chatService = require('../services/chat.service')


exports.chatQuery = async(req,res,next)=>{
    try {
        const result = await chatService.chat(req.body.question)
       return  res.status(200).json(result)
    } catch (error) {
        next(error)
    }

}