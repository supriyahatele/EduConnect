const { CourseModel } = require("../models/course.model");
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();
// get all course list only acces for admin

const allCourse = async (req, res) => {
    try{
        const courseData = await CourseModel.find();
        res.status(200).json(courseData);

    }catch(error){
        res.status(500).json({message : error.message})
    }
}


// get the  course info
const courseById =  async (req, res) => {
    try{
        const { id } = req.params;
      
        const course = await CourseModel.findById(id);
    
        if(course){
            res.status(200).json({course : course});
        }else{
            res.status(404).json({message : 'course not found'})
        }

    }catch(error){
        res.status(500).json({message : error.message})
    }
}




// createCourse
const createCourse = async (req, res) => {
    try{
        const {courseName,educator,price,techStack,rating,reviews} = req.body;
        const file=req.file

        if(courseName && educator && techStack.length > 0 && price&& file &&rating && reviews ){
            let uploadedFileURL= await uploadFile(file)
            console.log(uploadedFileURL)
            const newUser = new CourseModel({...req.body, imageUrl:uploadedFileURL})
            // console.log(newUser)
            await newUser.save(); 
        res.status(201).json({message : 'course added  successfully '})
            
        }else{
            res.status(400).json({message : 'all fields are required'})
        }

    }catch(error){
        res.status(500).json({message : error.message})
    }
}



// for to update the course details.
const updateCourse = async (req, res) => {
    try{
        const { id } = req.params;
        const isCourse = await CourseModel.findById(id);
        if(isCourse) {
           const updatedCourse= await CourseModel.findByIdAndUpdate({_id:id},req.body,{new:true});
            
            res.status(200).json(updatedCourse)
        }else{
            res.status(404).json({message : 'course not found'})
        }
    }catch(error){
        res.status(500).json({message : error.message})
    }
}


// removes the course from db if exists.
const deleteCourse = async ( req,res) => {
    try{
        const { id } = req.params;
        const isCourse = await CourseModel.findById(id);
        if(isCourse){
            await CourseModel.findByIdAndDelete(id);
            res.status(200).json({message : "course deleted successfully"})
        }else{
            res.status(404).json({message : "course not found"})
        }

    }catch(error){
        res.status(500).json({message:error.message})
    }
}


const s3Client = new S3Client({
    region: "ap-southeast-2",
    credentials: {
        accessKeyId: process.env.ACCESSKEYID,
        secretAccessKey: process.env.ACCESSKEY,
    }
})


async function uploadFile(file) {
    try {
        // Prepare parameters for uploading the file
        const uploadParams = {
            Bucket: "educonnect",
            Key: "CourseImage/" + file.originalname,
            Body: file.buffer 
        };

        // Upload the file to S3
        const command = new PutObjectCommand(uploadParams);
        const response = await s3Client.send(command);

        console.log(response);
        console.log("File uploaded successfully");

        return response.Location; // Return the URL of the uploaded file
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
}


module.exports = {
    allCourse,
    createCourse,
    courseById,
    deleteCourse,
    updateCourse,
    uploadFile
}

