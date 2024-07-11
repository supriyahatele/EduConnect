const express = require("express");
const multer = require("multer");
const courseRouter = express.Router();
const upload = multer({ dest: "uploads/" });



const { auth } = require("../middlewares/auth.middleware");
const { access } = require("../middlewares/access.middleware");
const { isEnrolled } = require("../middlewares/isEnrolled.middleware")

const {
  createCourse,
  allCourse,
  courseById,
  updateCourse,
  deleteCourse,
  getMyCourses,
} = require("../controllers/course.controller");
const {
  allVideos,
  uploadVideo,
  updateVideo,
  deleteVideo,
  singleVideo,
} = require("../controllers/video.controller");
const { getAssignment, addAssignment, getSingleAssignment } = require("../controllers/assignment.controller");
const { getCourseSubmissions } = require("../controllers/submission.controller");

// to create course

courseRouter.post("/",auth,access('educator'), createCourse);

// to get all  courses  only for admin
courseRouter.get("/",auth,access('admin'), allCourse);

// to get all  courses of specific student
courseRouter.get('/mycourses',auth,getMyCourses)

// to get course details
courseRouter.get("/:id",courseById);

// to update the course details

courseRouter.patch("/:id",auth,access('educator'), updateCourse);

// to delete the course
courseRouter.delete("/:id",auth,access('educator'), deleteCourse);

courseRouter.get("/:id/videos",auth, allVideos);

courseRouter.get("/:id/videos/:video_id",auth, singleVideo);

courseRouter.post("/:id/videos/uploads",auth, upload.single("video"),auth,access('educator'), uploadVideo);

courseRouter.patch("/:id/videos/:video_id",auth,access("educator"),updateVideo);

courseRouter.delete("/:id/videos/:video_id",auth,access("educator"),deleteVideo);

courseRouter.get("/:id/getAssignment", auth, getAssignment);

courseRouter.get("/:id/getAssignment/:assignment_id", auth, getSingleAssignment);

courseRouter.post("/:id/createAssignment",auth,access("educator"),addAssignment);



module.exports = {
  courseRouter,
};
