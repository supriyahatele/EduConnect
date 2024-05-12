import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faClock, faInfoCircle, faUserCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { Box,Flex,IconButton,Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const AssignmentCard = ({assignment}) => {
    const navigate = useNavigate()
  return (
    <Box p={4} borderWidth="1px" borderRadius="md" boxShadow="md" onClick={() => navigate(`${assignment._id}`)}>
    <Text fontWeight="bold" fontSize="lg" mb={2}>{assignment.title}</Text>
    <Text mb={2}>{assignment.description}</Text>
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
  </Box>
);
};



export  {AssignmentCard};
