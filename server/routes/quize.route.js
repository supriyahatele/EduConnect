const express = require("express");
const {
  getQuiz,
  postQuiz,
  updateQuiz,
  deleteQuiz,
} = require("../controllers/quize.controller");

const quizRouter = express.Router();

quizRouter.get("/getQuiz", getQuiz);
quizRouter.post("/createQuiz", postQuiz);
quizRouter.patch("/updateQuiz/:id", updateQuiz);
quizRouter.delete("/deleteQuiz/:id", deleteQuiz);

module.exports = { quizRouter };
