
const { default: mongoose } = require("mongoose");
const Chat = require("../models/chatModel");
const User = require('../models/userModel');
const dotenv = require('dotenv');
// const { OpenAI } = require('openai');
const { Groq } = require('groq-sdk');
const Project = require("../models/projectModel");

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
    let projectId = req.query.projectId
    if(!userId){
        res.status(400).send('User ID required')
    }
    try {
        // res.status(200).json(userId)
        // let user  = await User.find( {_id : new ObjectId(userId)} )
        // res.status(200).json(user)

        let allChats = await Chat.find( { 'owner._id' : new ObjectId(userId), projectId: projectId ? projectId : null })
        res.status(200).json(allChats)        
    } catch {
    }
}

const createChat = async (req, res, next) => {
    if(!req.body.userId){
        res.status(400).send('User ID required')
    }
    try {
        let owner = await User.findById(req.body.userId)
    
        let chat = await Chat.create({
            name: req.body.name || "Untitled Chat",
            owner: {
                name: owner.name,
                email: owner.email,
                image: owner.image,
                _id: owner._id
            },
            projectId: req.body.projectId ? new ObjectId(req.body.projectId) : null,
        })


        if(req.body.projectId){
            await Project.updateOne({ _id: new ObjectId(req.body.projectId) }, {
                $push: { chats: chat.id }
            })
        }
        await User.updateOne({ _id: new ObjectId(req.body.userId) }, {
            $push: { chats: chat.id }
        })

        res.status(201).json(chat)
    } catch (err) {
        console.log(err)
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

            let madeBy = await User.findById(req.body.prompt.madeBy) 

            let newPrompt = {
                madeBy: {
                    name: madeBy.name,
                    email: madeBy.email, 
                    image: madeBy.image,
                    _id: madeBy._id
                },
                question: req.body.prompt.question,
                reply: req.body.prompt.reply
            }


            let response = await Chat.findOneAndUpdate({  _id: new ObjectId(chatId) }, {
              $push: {
                allPrompts: newPrompt
              }  
            }, {new: true})
            // let madeByUser = await User.findById(response.allPrompts.slice(-1)[0].madeBy._id)
            // let insertedPrompt = response.allPrompts.slice(-1)[0]
            // insertedPrompt = {
            //     question: insertedPrompt.question,
            //     reply: insertedPrompt.reply,
            //     madeBy: madeByUser,
            //     _id: insertedPrompt._id
            // }
            res.status(200).json(newPrompt)
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

        let N = 1; // last N messages for history

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