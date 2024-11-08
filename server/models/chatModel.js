/* eslint-disable prefer-arrow-callback */
const mongoose = require('mongoose');
const validator = require('validator');

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


const promptSchema = new mongoose.Schema({
    madeBy: userSchema,
    question: String,
    reply: String,
})


const chatSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Chat must have a name. Please provide name'],
            trim: true,
        },
        owner: {
            type: userSchema,
            required: true,
        },
        dateCreated: {
            type: Date,
            default: Date.now()
        },
        projectId: {
            type: mongoose.Schema.Types.ObjectId || null,
            ref: 'Project',
        },
        allPrompts: [promptSchema]
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);


const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat, chatSchema;
