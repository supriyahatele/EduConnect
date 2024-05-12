import { Box, Center } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContextProvider";

const initialState = {
  isLoading : false,
  data : [],
  isError: false,
}

const SingleCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(initialState);
  const {authUser} = useContext(AuthContext)
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
    getData()
  }, []);
  if(course.isLoading) return <Center>loading</Center>
  if(course.isError) return <Center>error</Center>
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
      </Box>
    </Box>
  );
};

export { SingleCourse };
