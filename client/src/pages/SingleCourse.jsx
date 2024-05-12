import { Box, Button, Center, Heading, Image, Select, useDisclosure, Text } from "@chakra-ui/react";
import axios from "axios";
import  { useContext } from "react";
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
import { UpdateCourse } from "../components/UpdateCourse";
import { QuizData } from "./QuizData";

const SingleCourse = () => {
  const navigate = useNavigate();
  const { authUser } = useContext(AuthContext);
  const { id } = useParams();
  const {isOpen,onOpen,onClose} = useDisclosure()

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
    <Box  backgroundColor={"#1a202c"} color={"#fff"} >
      <Box textAlign={"center"} height={"550px"} width={"90%"} margin={"auto"}>
        <Box textAlign={"center"}  display={"flex"}gap={"20px"}   >
          <Box width={"30%"}>
          <Image src={course?.imageUrl} width={"100%"} height={"400px"}  mt={"20px"}/>
          </Box>
          <Box width={"69%"} margin={"auto"}>
            <Text fontSize={"35px"} fontWeight={"bold"}>{course?.courseName}</Text>
            <Box width={"100%"} textAlign={"left"} >
            <Text fontSize={"18px"} fontWeight={"normal"}>Build fully functional web apps using MEAN stack. Acquire comprehensive skills in MongoDB, Express.js, Angular, and Node.js to design, develop, and deploy real-world high-performance web applications.</Text>
            </Box>
      {authUser.role === 'educator' && <Box textAlign={'right'} mr={'30px'} > <Button mr={'40px'} color={'white'} m={'auto'} p={3} bgColor={'blue.600'} onClick={onOpen}>students</Button></Box>}
      <>
       
        {isOpen && (
          <UpdateCourse isOpen={isOpen} onClose={onClose} course={course} />
        )}
      </>


            <Text  fontSize={"18px"} mt={"10px"} fontWeight={"medium"} >{` Instructor ${course?.educator}`}</Text>
            <Text fontSize={"18px"} mt={"10px"} fontWeight={"normal"}>{`course fees:${course?.price} ₹`}</Text>
            <Text fontSize={"18px"} mt={"10px"} fontWeight={"normal"}>
               What You will learn :
              {course?.techStack.map((tech) => {
                let newString = "";
                return (newString += tech + " ");
              })}
              </Text>
            {!showEnrollForm ? (
        <Button  onClick={handleEnroll} mt={"5px"}>
          Enroll now
        </Button>
      ) : (
        <Box>
          <Select width={"50%"} margin={"auto"} mt={"10px"}  backgroundColor={"#1a202c"}
            placeholder="Select payment method"
            value={selectedPaymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <option style={{backgroundColor:"#1a202c", color:"#fff"}} value="debitCard">Debit Card</option>
            <option style={{backgroundColor:"#1a202c", color:"#fff"}} value="creditCard">Credit Card</option>
            <option style={{backgroundColor:"#1a202c", color:"#fff"}} value="upiID">UPI ID</option>
          </Select>
          <Button mt={"10px"} onClick={handleSubmitEnrollment}>Enroll</Button>
        </Box>
      )}
          </Box>
        </Box>
        <Box>
        <Link to="assignments">assignments</Link>
        <Link to="videos">videos</Link>
        <QuizData/>
      </Box>
      </Box>
      
      
    </Box>
  );
};

export { SingleCourse };
