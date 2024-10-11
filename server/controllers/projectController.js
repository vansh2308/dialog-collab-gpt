const { default: mongoose } = require("mongoose");
const Project = require("../models/projectModel");
const { User } = require("../models/userModel");
var ObjectId = require('mongoose').Types.ObjectId;


const getAllProjects = async (req, res, next) => {
    let userId = req.query.userId
    if(!userId){
        res.status(400).send('User ID required')
    }
    try {
        // let allChats = await Project.find({owner: new ObjectId(userId) })
        let allProjects = await Project.find( {owner: {_id: new ObjectId(userId)} } )
        res.status(200).json(allProjects)        
    } catch {
    }
}



const createProject = async (req, res, next) => {
    if(!req.body.userId){
        res.status(400).send('User ID required')
    }
    try {
        let owner = await User.findOne({ _id: new ObjectId(req.body.userId) })
        console.log(typeof(owner))

        let project = await Project.create({
            name: req.body.name || 'Untitled Project',
            owner: owner,
            members: [ {user: owner, status: 'Owner'} ]
        })
        
        project = await Project.findOneAndUpdate({ _id: project._id }, {
            inviteLink: `http://localhost:5173/${req.body.userId}/project/${project._id}`
        }, {new: true})

        // WIP: dont need this ⬇
        // await User.updateOne({ _id: new ObjectId(req.body.userId) }, {
        //     $push: { projects: project._id }
        // })

        res.status(201).json(project)
    } catch {

    }
}



module.exports = {
    getAllProjects,
    createProject
}