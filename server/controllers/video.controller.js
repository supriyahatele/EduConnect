const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { VideoModel } = require("../models/video.model");
require('dotenv').config();
const fs = require('fs');

const s3Client = new S3Client({
    region: "ap-southeast-2",
    credentials: {
        accessKeyId: process.env.ACCESSKEYID,
        secretAccessKey: process.env.ACCESSKEY,
    }
})

const allVideos = async (req,res) => {
    try{
        const course = req.course;
        const videos = await VideoModel.find({course})
        res.status(200).json(videos);

    }catch(error){

    }

}

const uploadVideo = async (req,res) => {
    try{
        const videoName = `video-${Date.now()}.mp4`
        
        const filePath = req.file.path;
        const uploadParams = {
            Bucket: 'educonnect',
            Key: `uploads/${videoName}`,
            Body: fs.createReadStream(filePath),
            ContentType: 'video/mp4'
        };
       
        await s3Client.send(new PutObjectCommand(uploadParams));
        const videoUrl = `${process.env.AWS_BUCKET_URL}${videoName}`;
       
        const newVideo = new VideoModel({...req.body,videoUrl})
        await newVideo.save();

        res.status(201).json({message : 'successfully uploaded video'})

        }catch(error){
        res.status(500).json({message : error.message});
    }
}
const updateVideo = async () => {
    try{

    }catch(error){

    }

}

const deleteVideo = async () => {
    try{

    }catch(error){

    }
}

module.exports = {
    allVideos,
    uploadVideo,
    updateVideo,
    deleteVideo
}