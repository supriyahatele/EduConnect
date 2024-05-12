import { Box, Button, Select } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContextProvider";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContextProvider";

const initialState = {
  isLoading : false,
  data : [],
  isError: false,
}

const SingleCourse = () => {
    const navigate=useNavigate()
    const {authUser} = useContext(AuthContext)
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  
  useEffect(() => {
    const getData=async ()=>{
        setCourse(prev => ({
          ...prev,
          isLoading : true
        }))
        const data = await axios.get(`http://localhost:3000/courses/${id}`,{
          headers:{
            'Authorization' : `Bearer ${authUser.token}`
          }
        });
        if(data.data.message){
          setCourse(prev => ({
            ...prev,
            isLoading : false,
            isError: true
          }))

        }else{
          setCourse(prev => ({
            ...prev,
            isLoading : false,
            data : data.data.course

          }))
        }
    }
    getData();
  }, []);
  if(course.isLoading) return <Center>loading</Center>
  if(course.isError) return <Center>error</Center>

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

  return (
    <Box>
      <Box>
        <Link to='assignments'>assignments</Link>
        <Link to='videos'>videos</Link>
      </Box>
      <Box textAlign={'center'}>
        <div>SingleCourse</div>
        <Box textAlign={'center'}>
          <h1>{course.data?.courseName}</h1>
          <h1>{course.data?.educator}</h1>
          <h1>{course.data?.price}</h1>
          <h1>
            {course.data?.techStack?.map((tech) => {
              let newString = "";
              return (newString += tech + " ");
            })}
          </h1>
        </Box>
    <Box textAlign={'center'}>
      <div>SingleCourse</div>
      <Box textAlign={'center'}>
        <h1>{course?.courseName}</h1>
        <h1>{course?.educator}</h1>
        <h1>{course?.price}</h1>
        <h1>
          {course?.techStack.map((tech, index) => (
            <span key={index}>{tech} </span>
          ))}
        </h1>
      </Box>
      {!showEnrollForm ? (
        <Button onClick={handleEnroll}>Enroll now</Button>
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
