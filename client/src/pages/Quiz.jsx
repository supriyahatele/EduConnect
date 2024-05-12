import React from 'react'

const Quiz = () => {
  return (
   <QuizData/>
  )
}

export  {Quiz}





















































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { VStack, Heading, Radio, Button, Text } from '@chakra-ui/react';

// function Quiz() {
//     const [questions, setQuestions] = useState([]);
//     const [answers, setAnswers] = useState({});
//     const [score, setScore] = useState(0);

//     useEffect(() => {
//         // Fetch quiz questions from MongoDB Atlas
//         async function fetchQuestions() {
//             try {
//                 const response = await axios.get('/api/questions');
//                 setQuestions(response.data);
//             } catch (error) {
//                 console.error('Error fetching questions:', error);
//             }
//         }

//         fetchQuestions();
//     }, []);

//     const handleAnswerChange = (questionId, answer) => {
//         setAnswers(prevAnswers => ({
//             ...prevAnswers,
//             [questionId]: answer,
//         }));
//     };

//     const handleSubmit = () => {
//         // Calculate score
//         let newScore = 0;
//         questions.forEach(question => {
//             if (question.correctAnswer === answers[question._id]) {
//                 newScore++;
//             }
//         });
//         setScore(newScore);
//     };

//     return (
//         <VStack spacing={4} align="flex-start">
//             <Heading as="h1" size="xl">Quiz</Heading>
//             {questions.map(question => (
//                 <VStack key={question._id} align="flex-start" spacing={2}>
//                     <Heading as="h2" size="lg">{question.title}</Heading>
//                     {question.options.map(option => (
//                         <Radio
//                             key={option}
//                             value={option}
//                             isChecked={answers[question._id] === option}
//                             onChange={() => handleAnswerChange(question._id, option)}
//                         >
//                             {option}
//                         </Radio>
//                     ))}
//                 </VStack>
//             ))}
//             <Button colorScheme="blue" onClick={handleSubmit}>Submit</Button>
//             {score > 0 && <Text>Score: {score}</Text>}
//         </VStack>
//     );
// }

// export default Quiz;
