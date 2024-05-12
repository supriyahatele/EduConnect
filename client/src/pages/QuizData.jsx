

import React, { useEffect, useState, useContext } from "react";
import { Box, Button, Center, List, ListItem, Text } from "@chakra-ui/react";
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
    if (selectedOption === currentQuestion.options[currentQuestion.correctOptionIndex].option) {
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
    <>
      <Box bg={"#1a202c"} color={"#fff"} pt={3}>
        <Box width={"60%"} margin={"auto"} bg={"#fff"} color={"black"} p={10} >
          {!isLoading ? (
            <Box>
              {quiz.map((question, index) => (
                <Box key={question._id} >
                  {currentQuestionIndex === index && (
                    <Box>
                      <Center>
                        <Text fontWeight={"600"} fontSize={"20px"}>Question {index + 1}</Text>
                      </Center>
                      <Center>
                        <Text fontWeight={"600"} m={5}>{question.question}</Text>
                      </Center>
                      <Center>
                        <List gap={5}>
                          {question.options.map((option, optionIndex) => (
                            <ListItem key={optionIndex}>
                              <input
                                type="radio"
                                id={`option${optionIndex}`}
                                name={`question${index}`}
                                value={option.option}
                                checked={selectedOption === option.option}
                                onChange={() => handleOptionSelect(option.option)}
                                style={{ marginRight: "10px" }}
                              />
                              <label htmlFor={`option${optionIndex}`} >{option.option}</label>
                            </ListItem>
                          ))}
                        </List>
                      </Center>
                      <Center>
                        <Button onClick={handleNextQuestion} disabled={!selectedOption} mt={5} mb={5} bg={"#196ae5"} color={"#fff"}>Skip</Button>
                        <Button onClick={handleSkipQuestion} ml={5} mt={5} mb={5} bg={"#196ae5"} color={"#fff"}>Next</Button>
                      </Center>
                    </Box>
                  )}
                </Box>
              ))}
              {currentQuestionIndex === quiz.length && (
                <Center>
                  <Box height={"205px"}>
                    <Center>
                      <Text>Quiz Completed</Text>
                    </Center>
                    <Center>
                      <Text fontWeight={"600"} mt={5}>Your Score: {score}</Text>
                    </Center>
                    <Button onClick={handleNavigate} mt={5} bg={"#196ae5"} color={"#fff"}>Go back to home page</Button>
                  </Box>
                </Center>
              )}
            </Box>
          ) : (
            <Text>Loading...</Text>
          )}
          {/* {isError && <Text>Something went wrong...</Text>} */}
        </Box>
      </Box>
    </>
  );
};

export { QuizData };
