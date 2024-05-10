const express = require('express');
const multer = require('multer');
const courseRouter = express.Router();
const videoRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

const { auth } = require('../middlewares/auth.middleware');
const { access } = require('../middlewares/access.middleware');
const { createCourse, allCourse, courseById, updateCourse, deleteCourse } = require('../controllers/course.controller');
const { allVideos, uploadVideo, updateVideo, deleteVideo, singleVideo } = require('../controllers/video.controller');

// to create course 
courseRouter.post('/Course',createCourse )

// to get all the users -- access to admin only
courseRouter.get('/', allCourse)

// to get profile of the user -- user details
courseRouter.get('/:id',courseById )

// to update the user details

courseRouter.patch('/:id', updateCourse )

// to delete the user
courseRouter.delete('/:id', deleteCourse)


courseRouter.get('/:id/videos',allVideos)

courseRouter.get('/:id/videos/:video_id', singleVideo)

courseRouter.post('/:id/videos/uploads', upload.single('video'), uploadVideo)

courseRouter.patch('/:id/videos/:video_id', auth, access('educator'), updateVideo)

courseRouter.delete('/:id/videos/:video_id', auth, access('educator'), deleteVideo)

module.exports = {
    courseRouter
}


