const mongoose = require('mongoose');

const VideoSchema = mongoose.Schema({
    title : {type : String , required: true},
    course_id :{type: mongoose.Schema.Types.ObjectId, ref: "Course"} ,
    videoUrl : {type : String, required: true},
    educator : {type : String, required: true},
})

const VideoModel = mongoose.model('Video', VideoSchema);

module.exports = {
    VideoModel
}
