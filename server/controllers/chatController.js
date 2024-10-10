
const Chat = require("../models/chatModel")
const User = require('../models/userModel')

var ObjectId = require('mongoose').Types.ObjectId;

const getAllChats = async (req, res, next) => {
    let userId = req.query.userId
    if(!userId){
        res.status(400).send('User ID required')
    }
    try {
        let allChats = await Chat.find({owner: new ObjectId(userId) })
        res.status(200).json(allChats)
    } catch {

    }
}

const createChat = async (req, res, next) => {
    if(!req.body.userId){
        res.status(400).send('User ID required')
    }
    try {
        let chat = await Chat.create({
            name: req.body.name || "Untitled Chat",
            owner: new ObjectId(req.body.userId),
        })
        await User.updateOne({ _id: new ObjectId(req.body.userId) }, {
            $push: { chats: chat.id }
        })
        res.status(201).json(chat)
    } catch {

    }
}


const updateChat = async (req, res, next) => {
    let { chatId } = req.params
    try{
        if(req.body.type == 'rename'){
            await Chat.updateOne({ _id: new ObjectId(chatId) }, {
                name: req.body.name
            })
        }
        // WIP: Implement add prompts to chat 
        res.status(200).send('Chat renamed')
    } catch(err) {
    }
}

const deleteChat = async (req, res, next) => {
    let { chatId } = req.params
    try{
        let chat = await Chat.findOneAndDelete({_id: chatId})
        await User.updateOne({_id: chat.owner._id}, {
            $pull: { chats: chat._id }
        })
        res.status(200).json(chat)
    } catch (err){

    }
}



module.exports = {
    getAllChats,
    createChat,
    updateChat,
    deleteChat
}