

/* eslint-disable prefer-arrow-callback */
const mongoose = require('mongoose');
const { User, userSchema } = require('./userModel');
const { chatSchema, Chat } = require('./chatModel');
const { trim } = require('validator');



const memberSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum:  [ 'Owner', 'Active', 'Invite Sent']
    }
}, {_id: false});





const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'User must have a name. Please provide name'],
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: false,
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    members: [memberSchema],
    inviteLink: String,
    // chats: [chatSchema]
})


const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
