/* eslint-disable prefer-arrow-callback */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { Schema } = require('mongoose')




const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'User must have a name. Please provide name'],
            trim: true,
        },
        email: {
            type: String,
            required: [
                true,
                'Every User must have a unique Email. Please provide Email',
            ],
            unique: [true, 'Email already in use'],
            validate: [validator.isEmail, 'Invalid Email'],
            lowercase: true,
        },
        dateJoined: {
            type: Date,
            default: Date.now(),
        },
        image: String,
        admin: {
            type: Boolean,
            default: false,
        },
        active: {
            type: Boolean,
            default: true,
        },
        chats: [{
            type: Schema.Types.ObjectId,
            ref: 'Chat',
            default: []
            
        }],
        // projects: [{
        //     type: Schema.Types.ObjectId,
        //     ref: 'Project',
        //     default: []
        // }]
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;
    next();
});
userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
