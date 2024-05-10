const express = require("express");
const {
  submitAssignment,
  updateSubmission,
} = require("../controllers/submission.controller");
const { auth } = require("../middlewares/auth.middleware");
const { access } = require("../middlewares/access.middleware");

const submissionRouter = express.Router();

submissionRouter.post("/submit",auth,access("student"), submitAssignment);
submissionRouter.patch("/updateSubmission/:id",auth,access("student"), updateSubmission);

module.exports = { submissionRouter };
