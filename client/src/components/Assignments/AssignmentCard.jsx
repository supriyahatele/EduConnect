import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faClock, faInfoCircle, faUserCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { Box,Button,Flex,IconButton,Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContextProvider';

const AssignmentCard = ({assignment,handleDelete}) => {
    const navigate = useNavigate()
    const {authUser} = useContext(AuthContext)
  return (
    <Box p={4} borderWidth="1px" borderRadius="md" boxShadow="md" bg={"#1a202c"} color={"#fff"}>
    <Text fontWeight="bold" fontSize="lg" mb={2}>{assignment.title}</Text>
    
    <Flex alignItems="center" mb={2}>
    <FontAwesomeIcon icon={faUserCircle} />
      <Text ml={2}>{assignment.username}</Text>
    </Flex>
    <Flex alignItems="center" mb={2}>
    <FontAwesomeIcon icon={faClock} />
      <Text ml={2}>Assigned: {assignment.assigningTime}</Text>
    </Flex>
    <Flex alignItems="center" mb={2}>
    <FontAwesomeIcon icon={faClock} />
      <Text ml={2}>Due: {assignment.submissionTime}</Text>
    </Flex>
    <Flex justifyContent="flex-end" mt={4}>
      <IconButton
        aria-label="Submit assignment"
        icon={<FontAwesomeIcon icon={faUser} />}
        mr={2}
      />
      <IconButton
        aria-label="View details"
        icon={<FontAwesomeIcon icon={faInfoCircle} />}
      />
    </Flex>
    <Button bgColor={'blue.600'} color={'white'} onClick={() => navigate(`${assignment._id}`)}>view </Button>
    {authUser.role === 'educator' && <Button bgColor={'red'} ml={2} color={'white'} onClick={() => handleDelete(assignment._id)}>delete</Button> }
  
  </Box>
);
};



export  {AssignmentCard};
