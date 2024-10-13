
const { default: mongoose } = require("mongoose");
const Chat = require("../models/chatModel");
const User = require('../models/userModel');
const dotenv = require('dotenv');
// const { OpenAI } = require('openai');
const { Groq } = require('groq-sdk');

dotenv.config({ path: '../config.env' });

// const client = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

const client = new Groq({
    apiKey: process.env.OPENAI_API_KEY,
});

var ObjectId = require('mongoose').Types.ObjectId;

const getAllChats = async (req, res, next) => {
    let userId = req.query.userId
    if(!userId){
        res.status(400).send('User ID required')
    }
    try {
        // res.status(200).json(userId)
        // let user  = await User.find( {_id : new ObjectId(userId)} )
        // res.status(200).json(user)

        let allChats = await Chat.find( {owner: new ObjectId(userId) })
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
            res.status(200).send('Chat renamed')

        } else if (req.body.type == 'add prompt'){
            let response = await Chat.findOneAndUpdate({  _id: new ObjectId(chatId) }, {
              $push: {
                allPrompts: req.body.prompt
              }  
            }, {new: true})
            let madeByUser = await User.findById(response.allPrompts.slice(-1)[0].madeBy._id)
            let insertedPrompt = response.allPrompts.slice(-1)[0]
            insertedPrompt = {
                question: insertedPrompt.question,
                reply: insertedPrompt.reply,
                madeBy: madeByUser,
                _id: insertedPrompt._id
            }
            res.status(200).json( insertedPrompt )
        }
 
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

const getPromptResponse = async (req, res, next) => {
    const {chatId} = req.params
    const prompt = req.body.prompt;
    try {
        let chat = await Chat.findOne({_id: chatId})

        let N = 3; // last N messages for history

        let history = chat.allPrompts.slice(-N).flatMap(prompt => [
            { role: 'user', content: prompt.question },
            { role: 'assistant', content: prompt.reply }
        ]);

        history.push({ role: 'user', content: prompt });
        
        const chatCompletion = await client.chat.completions.create({
            messages: history,
            // model: 'gpt-3.5-turbo',
            model: 'gemma-7b-it',
        });
        const response = chatCompletion.choices[0].message.content;

        // response = 'Just a demo reply'

        res.status(200).json({ promptResponse: response })
    }
    catch (err) {
    }
}

module.exports = {
    getAllChats,
    createChat,
    updateChat,
    deleteChat,
    getPromptResponse,
}