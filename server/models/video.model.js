const mongoose = require('mongoose');

const VideoSchema = mongoose.Schema({
    title : {type : String , required: true},
    course : {type : String },
    videoUrl : {type : String, required: true},
    educator : {type : String, required: true},
})

const VideoModel = mongoose.model('Video', VideoSchema);

module.exports = {
    VideoModel
}
