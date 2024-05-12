import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Select,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContextProvider";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourseFailure,
  getCourseLoading,
  getCourseSuccess,
} from "../redux/actionTypes";
import { QuizData } from "./QuizData";

const SingleCourse = () => {
  const navigate = useNavigate();
  const { authUser } = useContext(AuthContext);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, isError, course } = useSelector(
    (state) => state.singleCourse
  );
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  // const {authUser} = useContext(AuthContext)
  useEffect(() => {
    const getData = async () => {
      dispatch({ type: getCourseLoading });
      try {
        const data = await axios.get(`http://localhost:3000/courses/${id}`, {
          // headers:{
          //   'Authorization' : `Bearer ${authUser.token}`
          // }
        });
        // setCourse(data)
        console.log(data.data.course);
        dispatch({ type: getCourseSuccess, payload: data.data.course });
      } catch (error) {
        dispatch({ type: getCourseFailure });
      }
    };
    getData();
  }, []);

  const handleEnroll = async () => {
    setShowEnrollForm(true);
  };

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const handleSubmitEnrollment = async () => {
    // Perform enrollment with selected payment method
    await axios.post(
      `http://localhost:3000/enrollments/enroll`,
      { courseID: id, paymentMethod: selectedPaymentMethod, status: true }, // Set status to true for enrollment,
      {
        headers: {
          Authorization: `Bearer ${authUser.token}`,
        },
      }
    );
    navigate("/courses");
  };

  if (isLoading) return <Center>loading</Center>;
  if (isError) return <Center>error</Center>;

  return (
    <Box backgroundColor={"#1a202c"} color={"#fff"}>
      <Box textAlign={"center"} width={"90%"} margin={"auto"}>
        <Box textAlign={"center"} display={"flex"} gap={"20px"}>
          <Box width={"30%"}>
            <Image
              src={course?.imageUrl}
              width={"100%"}
              height={"400px"}
              mt={"20px"}
            />
          </Box>
          <Box width={"69%"} margin={"auto"}>
            <Text fontSize={"35px"} fontWeight={"bold"}>
              {course?.courseName}
            </Text>
            <Box width={"100%"} textAlign={"left"}>
              <Text fontSize={"18px"} fontWeight={"normal"}>
                Build fully functional web apps using MEAN stack. Acquire
                comprehensive skills in MongoDB, Express.js, Angular, and
                Node.js to design, develop, and deploy real-world
                high-performance web applications.
              </Text>
            </Box>
            <Text
              fontSize={"18px"}
              mt={"10px"}
              fontWeight={"medium"}
            >{` Instructor ${course?.educator}`}</Text>
            <Text
              fontSize={"18px"}
              mt={"10px"}
              fontWeight={"normal"}
            >{`course fees:${course?.price} ₹`}</Text>
            <Text fontSize={"18px"} mt={"10px"} fontWeight={"normal"}>
              What You will learn :
              {course?.techStack.map((tech) => {
                let newString = "";
                return (newString += tech + " ");
              })}
            </Text>
            {!showEnrollForm ? (
              <Button onClick={handleEnroll} mt={"5px"}>
                Enroll now
              </Button>
            ) : (
              <Box>
                <Select
                  width={"50%"}
                  margin={"auto"}
                  mt={"10px"}
                  backgroundColor={"#1a202c"}
                  placeholder="Select payment method"
                  value={selectedPaymentMethod}
                  onChange={handlePaymentMethodChange}
                >
                  <option
                    style={{ backgroundColor: "#1a202c", color: "#fff" }}
                    value="debitCard"
                  >
                    Debit Card
                  </option>
                  <option
                    style={{ backgroundColor: "#1a202c", color: "#fff" }}
                    value="creditCard"
                  >
                    Credit Card
                  </option>
                  <option
                    style={{ backgroundColor: "#1a202c", color: "#fff" }}
                    value="upiID"
                  >
                    UPI ID
                  </option>
                </Select>
                <Button mt={"10px"} onClick={handleSubmitEnrollment}>
                  Enroll
                </Button>
              </Box>
            )}
          </Box>
        </Box>
        <Box>
          <Link to="assignments">assignments</Link>
          <Link to="videos">videos</Link>
        </Box>
        <Text mb={"20px"} fontSize={"25px"} mt={"10px"} fontWeight={"medium"}>
          What you'll learn
        </Text>
        <Box
          display={"flex"}
          width={"70%"}
          margin={"auto"}
          gap={"40px"}
          textAlign={"justify"}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            width={"700px"}
            height={"200px"}
            gap={"20px"}
          >
            <Box>
              <Text>
                Master Angular for frontend development; explore HTML, CSS, and
                JavaScript essentials for dynamic and interactive web
                applications.{" "}
              </Text>
            </Box>
            <Box>
              <Text>
                Integrate Angular, Node.js, and MongoDB to create a full-fledged
                MEAN stack application, ensuring modularity and maintainability.{" "}
              </Text>
            </Box>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            width={"700px"}
            height={"200px"}
            gap={"20px"}
          >
            <Box>
              <Text>
                Build RESTful APIs using Node.js & Express; learn MongoDB for
                database interaction, advanced error handling, security, and
                testing.{" "}
              </Text>
            </Box>
            <Box>
              <Text>
                From setup to deployment, develop a full-stack application;
                utilize the MEAN stack, ensure quality through testing, and
                deploy to production.{" "}
              </Text>
            </Box>
          </Box>
        </Box>
        <Box
          display={"flex"}
          gap={"80px"}
          width={"85%"}
          margin={"auto"}
        >
          <Box>
            <Text mb={"20px"} fontSize={"25px"} fontWeight={"medium"}>
              Advance your subject-matter expertise
            </Text>
            <Box textAlign={"left"}>
              <li>Learn in-demand skills from university and industry experts</li>
              <li>Master a subject or tool with hands-on projects</li>
              <li>Develop a deep understanding of key concepts</li>
              <li>Earn a career certificate from Board Infinity</li>
            </Box>
          </Box>
          <Box>
            <Image src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/f9981360ed304b477666954b42d5586f.png?auto=format%2Ccompress&dpr=1&w=562&h=221&q=40&fit=crop" />
          </Box>
        </Box>
        
      </Box>
    </Box>
  );
};

export { SingleCourse };
