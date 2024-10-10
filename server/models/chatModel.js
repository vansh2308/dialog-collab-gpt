

/* eslint-disable prefer-arrow-callback */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const promptSchema = new mongoose.Schema([{
    version: Number,
    madeBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    question: String,
    reply: String,
}])


const chatSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'User must have a name. Please provide name'],
            trim: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        dateCreated: {
            type: Date,
            default: Date.now()
        },
        allPrompts: [promptSchema]
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);


const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
