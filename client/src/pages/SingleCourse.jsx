import { Box } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  useEffect(() => {
    const getData=async ()=>{
        const data = await axios.get(`http://localhost:3000/courses/${id}`);
        setCourse(data?.data?.course);
        console.log(data.data.course)
    }
    getData()
  }, []);
  return (
    <Box textAlign={'center'}>
      <div>SingleCourse</div>
      <Box textAlign={'center'}>
        <h1>{course.courseName}</h1>
        <h1>{course.educator}</h1>
        <h1>{course.price}</h1>
        <h1>
          {course.techStack.map((tech) => {
            let newString = "";
            return (newString += tech + " ");
          })}
        </h1>
      </Box>
    </Box>
  );
};

export { SingleCourse };
