import React, { useEffect, useState, useContext } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getQuizData } from "../redux/action";
import { AuthContext } from "../Contexts/AuthContextProvider";
import { useNavigate } from "react-router-dom";

const QuizData = () => {
  const { authUser } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { isError, isLoading, quiz } = useSelector((state) => state.Quiz);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getQuizData(authUser.token));
  }, []);

  const handleOptionSelect = (option) => setSelectedOption(option);

  const handleNextQuestion = () => {
    const currentQuestion = quiz[currentQuestionIndex];
    if (selectedOption === currentQuestion.options[currentQuestion.correctOptionIndex].text) {
      setScore(score + 1);
    }
    setSelectedOption('');
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleSkipQuestion = () => {
    setSelectedOption('');
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <Box width={"60%"} margin={"auto"}>
      {!isLoading ? (
        <div>
          {quiz.map((question, index) => (
            <Box key={question._id}>
              {currentQuestionIndex === index && (
                <>
                  <Text>Question {index + 1}</Text>
                  <Text>{question.question}</Text>
                  <ul>
                    {question.options.map((option, optionIndex) => (
                      <li key={optionIndex}>
                        <input
                          type="radio"
                          id={`option${optionIndex}`}
                          name={`question${index}`}
                          value={option.text}
                          checked={selectedOption === option.text}
                          onChange={() => handleOptionSelect(option.text)}
                        />
                        <label htmlFor={`option${optionIndex}`}>{option.text}</label>
                      </li>
                    ))}
                  </ul>
                  <Button onClick={handleNextQuestion}>Next</Button>
                  <Button onClick={handleSkipQuestion}>Skip</Button>
                </>
              )}
            </Box>
          ))}
          {currentQuestionIndex === quiz.length && (
            <Box>
              <Text>Quiz Completed</Text>
              <Text>Your Score: {score}</Text>
              <Button onClick={handleNavigate}>Go back to home page</Button>
            </Box>
          )}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
      {isError && <h1>Something went wrong...</h1>}
    </Box>
  );
};

export { QuizData };
