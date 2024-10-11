const express = require('express');
const { getAllChats, createChat, updateChat, deleteChat } = require('../controllers/chatController');
const { getAllProjects, createProject } = require('../controllers/projectController');

const Router = express.Router();

// Chat routes 
Router.get('/chats', getAllChats)
Router.post('/chat', createChat)
Router.put('/chat/:chatId', updateChat) 
Router.delete('/chat/:chatId', deleteChat)


// Project routes 
Router.get('/projects', getAllProjects)
Router.post('/project', createProject)
// Router.put('/project/:projectId', updateProject) 
// Router.delete('/project/:projectId', deleteProject)


module.exports = Router;
