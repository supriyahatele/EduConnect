import axios from 'axios';
import { BASEURL } from '../config'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Contexts/AuthContextProvider';
import { Box, Flex, Text, Badge, VStack, Spinner } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser, faCalendar, faCode } from "@fortawesome/free-solid-svg-icons";
function Profile() {
  const [profile,setProfile] = useState([]);
const [isLoading,setIsLoading] = useState(false);
const [isError,setIsError] = useState(false);
const {authUser} = useContext(AuthContext);
  useEffect(() => {
    setIsLoading(true);
    axios.get(`${BASEURL}/users/profile`, {
      headers : {
        'Authorization' : `Bearer ${authUser.token}`
      }
    })
    .then(res => {
      console.log(res.data);
      setIsError(false);
      setIsLoading(false)
      setProfile(res.data)
    })
    .catch(err => {
      setIsError(true)
      setIsLoading(false)
      console.log(err);
    })


  },[authUser])
  if(isLoading) return <Box textAlign={'center'}>
  <Spinner
 thickness='4px'
 speed='0.65s'
 emptyColor='gray.200'
 color='blue.500'
 size='xl'
 
 />
</Box>
  if(isError) return <Box>error</Box>
  return (
    <Box bg={"#1a202c"} color={"#fff"} p={3}>
    <Box p={{ base: "4", md: "8" }} borderWidth="1px" bg={'#fff'} color={'#1a202c'}  borderRadius="lg" maxW="700px" mx="auto">
    <Flex alignItems="center" mb="4">
      <FontAwesomeIcon icon={faUser} size="2x" />
      <Text ml="2" fontSize={{ base: "xl", md: "2xl" }} fontWeight="semibold">{profile.user?.username}</Text>
    </Flex>
    <Flex direction={{ base: "column", md: "row" }} mb="2">
      <Flex alignItems="center" mr={{ md: "8" }}>
        <FontAwesomeIcon icon={faEnvelope} />
        <Text ml="2">{profile.user?.email}</Text>
      </Flex>
      <Flex alignItems="center">
        <FontAwesomeIcon icon={faCalendar} />
        <Text ml="2">Age: {profile.user?.age}</Text>
      </Flex>
    </Flex>
    <Flex alignItems="center" flexWrap="wrap">
      <Text mr="2" mb={{ base: "2", md: "0" }}>Interests:</Text>
      {profile.user?.interests.map((interest, index) => (
        <Badge key={index} mr="2" mb="2">{interest}</Badge>
      ))}
    </Flex>

    <Box w={'100%'}>
      {profile?.courses?.map((course, index) => (
        <Box key={index} p="4" borderWidth="1px" borderRadius="lg">
          <Text fontSize={{ base: "md", md: "xl" }} fontWeight="semibold">{course.courseName}</Text>
          <Text><FontAwesomeIcon icon={faUser} /> {course.educator}</Text>
          <Text><FontAwesomeIcon icon={faCode} /> Tech Stack: {course.techStack.join(", ")}</Text>
        </Box>
      ))}
    </Box>
  </Box>
  </Box>
);
}

export default Profile
