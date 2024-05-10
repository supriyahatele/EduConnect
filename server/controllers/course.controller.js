const { CourseModel } = require("../models/course.model");




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
        const {courseName,educator,price,techStack} = req.body;
        if(courseName && educator && techStack.length > 0 && price ){
            const newUser = new CourseModel({...req.body})
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

module.exports = {
    allCourse,
    createCourse,
    courseById,
    deleteCourse,
    updateCourse
}

