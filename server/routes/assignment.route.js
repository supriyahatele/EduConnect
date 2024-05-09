const express = require("express");
const { getAssignment, addAssignment, updateAssignment, deleteAssignment } = require("../controllers/assignment.controller");

const assignmentRouter = express.Router();

assignmentRouter.get("/getAssignment",getAssignment)
assignmentRouter.post("/createAssignment",addAssignment)
assignmentRouter.patch("/updateAssignment/:id",updateAssignment)
assignmentRouter.delete("/deleteAssignment/:id",deleteAssignment)


module.exports={assignmentRouter}