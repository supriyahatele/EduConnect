const express = require("express");
const multer = require("multer");
const courseRouter = express.Router();
// const upload = multer({ dest: "uploads/" });


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Store files in 'uploads' folder
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   }
// });
// const imageUpload = multer({storage})

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { auth } = require("../middlewares/auth.middleware");
const { access } = require("../middlewares/access.middleware");
const { isEnrolled } = require("../middlewares/isEnrolled.middleware")

const {
  createCourse,
  allCourse,
  courseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/course.controller");
const {
  allVideos,
  uploadVideo,
  updateVideo,
  deleteVideo,
  singleVideo,
} = require("../controllers/video.controller");
const { getAssignment, addAssignment } = require("../controllers/assignment.controller");

// to create course
// auth,access('educator'),
courseRouter.post("/Course",upload.single('file'), createCourse);

// to get all the users -- access to admin only
courseRouter.get("/", allCourse);

// to get profile of the user -- user details
courseRouter.get("/:id",auth, courseById);

// to update the user details

courseRouter.patch("/:id",auth,access('educator'), updateCourse);

// to delete the user
courseRouter.delete("/:id",auth,access('educator'), deleteCourse);

courseRouter.get("/:id/videos",auth,isEnrolled, allVideos);

courseRouter.get("/:id/videos/:video_id",auth,isEnrolled, singleVideo);

courseRouter.post("/:id/videos/uploads", upload.single("video"),auth,access('educator'), uploadVideo);

courseRouter.patch("/:id/videos/:video_id",auth,access("educator"),updateVideo);

courseRouter.delete("/:id/videos/:video_id",auth,access("educator"),deleteVideo);

courseRouter.get("/:id/getAssignment", auth,isEnrolled, getAssignment);

courseRouter.post("/:id/createAssignment",auth,access("educator"),addAssignment);

module.exports = {
  courseRouter,
};
