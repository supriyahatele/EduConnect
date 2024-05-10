const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
    courseName : { type : String , required : true },
    educator  : { type : String , required : true },
    price : { type : Number , required : true },
    studentID: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
    techStack  : { type : [String] },
},{
    versionKey : false,
    timestamps: true,
})

const CourseModel = mongoose.model('Course', CourseSchema);

module.exports = {
    CourseModel
}