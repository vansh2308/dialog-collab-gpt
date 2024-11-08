

/* eslint-disable prefer-arrow-callback */
const mongoose = require('mongoose');
const validator = require('validator')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User must have a name. Please provide name'],
        trim: true,
    },
    email: {
        type: String,
        required: true,
        index: false,
        unique: false,
        validate: [validator.isEmail, 'Invalid Email'],
        lowercase: true,
    },
    image: String,  
    _id: mongoose.Schema.Types.ObjectId
})


const memberSchema = new mongoose.Schema({
    user: {
        type: userSchema,
        required: true
    },
    status: {
        type: String,
        enum:  [ 'Owner', 'Joined', 'Invited']
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
