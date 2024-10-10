const express = require('express');
const { getAllChats, createChat, updateChat, deleteChat } = require('../controllers/chatController');

const Router = express.Router();

// Chat routes 
Router.get('/chats', getAllChats)
Router.post('/chat', createChat)
Router.put('/chat/:chatId', updateChat) 
Router.delete('/chat/:chatId', deleteChat)


module.exports = Router;
