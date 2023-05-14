const note = require('../models/note');
const noteModel = require('../models/note');

const createNote = async (req,res)=>{
    const {title,description} = req.body;
    const newNote = new noteModel({
        title:title,
        description:description,
        userId:req.userId
    })
    try{
        await newNote.save();
        res.status(201).json({Message : "Note Added Successfully"})
    }catch(error){
        console.log(error)
        res.status(500).json({Message : "Something Went Wrong"})
    }
}

const updateNote = async (req,res)=>{
    const id = req.params.id;
    const {title,description} = req.body;
    const newNote = {
        title:title,
        description:description,
        userId:req.userId
    }
    try{
        let note = await noteModel.findByIdAndUpdate(id,newNote,{new:true});
        res.status(200).json(note);
    }
    catch(error){
        console.log(error)
        res.status(500).json({Message : "Something Went Wrong"})
    }
}

const deleteNote = async (req,res)=>{
    const id = req.params.id;
    try{
        let note =await noteModel.findByIdAndRemove(id);
        res.status(200).json(note);
    }
    catch(error){
        console.log(error)
        res.status(500).json({Message : "Something Went Wrong"})
    }
}

const getNotes = async (req,res)=>{
    try{
        const notes = await noteModel.find({userId:req.userId})
        res.status(200).json(notes);
    }catch(error){
        console.log(error);
        res.status(500).json({Message : "Something Went Wrong"})
    }
}

module.exports ={createNote,updateNote,deleteNote,getNotes}