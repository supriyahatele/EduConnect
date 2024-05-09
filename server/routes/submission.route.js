const express = require("express");
const {
  submitAssignment,
  updateSubmission,
} = require("../controllers/submission.controller");

const submissionRouter = express.Router();

submissionRouter.post("/submit", submitAssignment);
submissionRouter.patch("/updateSubmission/:id", updateSubmission);

module.exports = { submissionRouter };
