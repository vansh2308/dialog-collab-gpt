const express = require('express');
const { getAllChats, createChat, updateChat, deleteChat, getPromptResponse } = require('../controllers/chatController');
const { getAllProjects, createProject, updateProject, deleteProject } = require('../controllers/projectController');

const Router = express.Router();

// Chat routes 
Router.get('/chats', getAllChats)
Router.post('/chat', createChat)
Router.put('/chat/:chatId', updateChat) 
Router.delete('/chat/:chatId', deleteChat)
Router.post('/chat/:chatId', getPromptResponse)


// Project routes 
Router.get('/projects', getAllProjects)
Router.post('/project', createProject)
Router.put('/project/:projectId', updateProject) 
Router.delete('/project/:projectId', deleteProject)


module.exports = Router;
