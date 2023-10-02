const express = require("express")
const mongoose = require("mongoose")
const Workout = require("../models/workoutModel")



const GetWorkouts = async(req,res)=>{
    const user_id = req.user._id

    const workouts = await Workout.find({user_id}).sort({CreatedAt:-1})
    res.status(200).send(workouts)
}


const GetWorkout = async(req,res)=>{
    const {id} = req.params
    const user_id = req.user._id
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send({error:'No Workout with that id'})
    }
    const workout = await Workout.findById(id)

    if(!workout){
        return res.status(404).send({error:"No Such Record found"})
    }
    res.status(200).send(workout)
}

const CreateWorkout = async(req,res)=>{
    const {title,load,reps} = req.body;


    let emptyFields = []


    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error:(emptyFields.length == 0 || emptyFields.length == 3) ?'Fill in all the fields' :`Fill the ${emptyFields} fields`,emptyFields})
    }
    try{
        const user_id = req.user._id
        const workout = await Workout.create({title,load,reps,user_id})
        res.status(200).send(workout)
    }catch(err){
        res.status(400).send({error:err.message})
    }
}


const DeleteWorkout = async(req,res)=>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send({error:'No Workout with that id'})
    }
    const workout = await Workout.findOneAndDelete({_id: id})

    if(!workout){
        return res.status(404).send({error:"No Such Record found"})
    }

    res.status(200).send(workout)
}

const UpdateWorkout =async(req,res)=>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send({error:'No Workout with that id'})
    }
    const workout  = await Workout.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!workout){
        return res.status(404).send({error:"No Such Record found"})
    }
    res.status(200).send(workout)
}
module.exports = {
    GetWorkout,
    GetWorkouts,
    CreateWorkout,
    UpdateWorkout,
    DeleteWorkout
}
