const { SubmissionModel } = require("../models/submission.model");


const submitAssignment = async(req,res)=>{
    const {id}=req.params;
    const studentID = req.id;
    const {submissionUrl,status}=req.body;
    try {
        const submitted = await SubmissionModel({ assignmentID:id,submissionUrl,status,studentID});
             await submitted.save();
        res.json({msg:"You're submitted your assignment Successfully!"});
    } catch (error) {
       console.log(error); 
       res.status(500).json({msg:error})
    }
}

const updateSubmission = async(req,res)=>{
    const {id}=req.params;
    const {submission,status}=req.body;
    try {
        const isUpdated = await SubmissionModel.findByIdAndUpdate({_id:id},{submission,status});
        res.json({msg:" You're updated your assignment Successfully!"});
    } catch (error) {
        console.log(error); 
        res.status(500).json({msg:error})
    }
}

module.exports={submitAssignment,updateSubmission}