import { Box, Button, Select } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleCourse = () => {
    const {authUser} = useContext(AuthContext)
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(`http://localhost:3000/courses/${id}`);
      setCourse(data?.data?.course);
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
    
  };

  return (
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
            <option value="debit_card">Debit Card</option>
            <option value="credit_card">Credit Card</option>
            <option value="upi_id">UPI ID</option>
          </Select>
          <Button onClick={handleSubmitEnrollment}>Enroll</Button>
        </Box>
      )}
    </Box>
  );
};

export { SingleCourse };
