
import { Box, Button, Center, Image, Select, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import  { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { getCourseFailure, getCourseLoading, getCourseSuccess } from "../redux/actionTypes";
import { UpdateCourse } from "../components/UpdateCourse";

const SingleCourse = () => {
    const navigate=useNavigate()
    const {authUser} = useContext(AuthContext)
  const { id } = useParams();
  const {isOpen,onOpen,onClose} = useDisclosure()

const dispatch=useDispatch()
const { isLoading,isError,course } = useSelector((state) => state.singleCourse);
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  
  // const {authUser} = useContext(AuthContext)
  useEffect(() => {
    const getData=async ()=>{
        dispatch({type:getCourseLoading})
        try {
          const data = await axios.get(`http://localhost:3000/courses/${id}`,{
            // headers:{
            //   'Authorization' : `Bearer ${authUser.token}`
            // }
          });
          // setCourse(data) 
          console.log(data.data.course)
          dispatch({type:getCourseSuccess, payload:data.data.course});
        } catch (error) {
          dispatch({type:getCourseFailure})
        }
       
    }
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
    await axios.post(`http://localhost:3000/enrollments/enroll`, 
      {courseID: id,
      paymentMethod: selectedPaymentMethod,
      status: true}, // Set status to true for enrollment,
      {headers:{
        'Authorization' : `Bearer ${authUser.token}`
      }
    });
    navigate("/courses")
  };



  if(isLoading) return <Center>loading</Center>
  if(isError) return <Center>error</Center>

  return (
    <Box>
      <Box>
        <Link to='assignments'>assignments</Link>
        <Link to='videos'>videos</Link>
      </Box>
      {authUser.role === 'educator' && <Box textAlign={'right'} mr={'30px'} > <Button mr={'40px'} color={'white'} m={'auto'} p={3} bgColor={'blue.600'} onClick={onOpen}>Edit</Button></Box>}
      <>
       
        {isOpen && (
          <UpdateCourse isOpen={isOpen} onClose={onClose} course={course} />
        )}
      </>


      <Box textAlign={'center'}>
    
{/* //         <h1>{course?.courseName}</h1>
//         <h1>{course?.educator}</h1>
//         <h1>{course?.price}</h1>
//         <h1>
//           {course?.techStack.map((tech, index) => (
//             <span key={index}>{tech} </span>
//           ))}
//         </h1> */}

        <div>SingleCourse</div>
        <Box textAlign={'center'} width={"30%"} margin={"auto"}>
        <Image src={course?.imageUrl} width={"100%"}/>
          <h1>{course?.courseName}</h1>
          <h1>{course?.educator}</h1>
          <h1>{course?.price}</h1>
          <h1>
            {course?.techStack?.map((tech) => {
              let newString = "";
              return (newString += tech + " ");
            })}
          </h1>
        </Box>
      </Box>
      {!showEnrollForm ? (
        <Button ml={"700px"} onClick={handleEnroll}>Enroll now</Button>
      ) : (
        <Box>
          <Select
            placeholder="Select payment method"
            value={selectedPaymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <option value="debitCard">Debit Card</option>
            <option value="creditCard">Credit Card</option>
            <option value="upiID">UPI ID</option>
          </Select>
          <Button onClick={handleSubmitEnrollment}>Enroll</Button>
        </Box>
      )}
    </Box>
  );
};

export { SingleCourse };
