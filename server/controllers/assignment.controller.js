const { AssignmentModel } = require("../models/assignment.model");

const getAssignment = async(req,res)=>{
    const page = req.query.page || 1;
    const size = req.query.size || 10;
    const skip = (page - 1) * size;
    try {
        const isAssignment = await AssignmentModel.find().skip(skip).limit(size);
        res.status(201).json({assignment:isAssignment});
    } catch (error) {
       console.log(error); 
       res.status(500).json({msg:error})
    }
}

const addAssignment = async(req,res)=>{
    const{title,description,userID,username,course}=req.body;
    try {
        const newAssignment = new AssignmentModel({title,description,userID,username,course});
        await newAssignment.save();
        res.status(201).json({msg:"You're added new assignment Successfully!"});
        
    } catch (error) {
       console.log(error); 
       res.status(500).json({msg:error})
    }
}

const updateAssignment = async(req,res)=>{
    const {id} = req.params;
    const {title,description}=req.body;
    try {
        const assignmentUpdate = await AssignmentModel.findByIdAndUpdate({_id:id},{title,description});
        res.status(201).json({msg:"You're updated your assignment Successfully!"});
    } catch (error) {
       console.log(error); 
       res.status(500).json({msg:error})
    }
}

const deleteAssignment = async(req,res)=>{
    const  {id}=req.params
    try {
        const deleteAssignment = await AssignmentModel.findByIdAndDelete({_id:id});
        res.status(201).json({msg:"You're deleted your assignment Successfully!"});
    } catch (error) {
       console.log(error); 
       res.status(500).json({msg:error})
    }
}


module.exports={getAssignment,addAssignment,updateAssignment,deleteAssignment}