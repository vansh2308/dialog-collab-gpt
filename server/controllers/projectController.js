const { default: mongoose } = require("mongoose");
const Project = require("../models/projectModel");
const User = require("../models/userModel");
var ObjectId = require('mongoose').Types.ObjectId;


const getAllProjects = async (req, res, next) => {
    let userId = req.query.userId
    if(!userId){
        res.status(400).send('User ID required')
    }
    try {
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
        let project = await Project.create({
            name: req.body.name || 'Untitled Project',
            owner: new ObjectId(req.body.userId),
            members: [ {user: new ObjectId(req.body.userId), status: 'Owner'} ]
        })

        project = await Project.findOneAndUpdate({ _id: project._id }, {
            inviteLink: `http://localhost:5173/${req.body.userId}/project/${project._id}`
        }, {new: true})


        await User.updateOne({ _id: new ObjectId(req.body.userId) }, {
            $push: { projects: project._id }
        })

        res.status(201).json(project)
    } catch {

    }
}


const updateProject = async (req, res, next) => {
    let { projectId }  = req.params
    try{
        if(req.body.type == 'rename'){
            await Project.updateOne({ _id: new ObjectId(projectId) }, {
                name: req.body.name
            })
        }
        res.status(200).json('Project renamed')
    } catch (err ){

    }
}


const deleteProject = async (req, res, next) => {
    let { projectId } = req.params
    try {
        let project = await Project.findOneAndDelete({ _id: projectId })
        await User.updateOne({_id: project.owner}, {
            $pull: { projects: project._id }
        })
        res.status(200).json(project)
    } catch(err){

    }
}



module.exports = {
    getAllProjects,
    createProject,
    updateProject,
    deleteProject
}