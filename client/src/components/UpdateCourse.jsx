import { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, IconButton, Tooltip, Box, Popover, PopoverTrigger, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverContent, PopoverBody } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


const UpdateCourse = ({isOpen,onClose,course}) => {
    const { courseName, educator, price, techStack, students } = course;
   
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Course Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form>
            <label>Course Name: </label>
            <input type="text" value={courseName} disabled />
            {/* Add other form fields for educator, price, techStack */}
            <Box>students</Box>
            {students.map((student,index) => (
              <Tooltip key={student} label={`Remove ${index}`} hasArrow>
                <Popover>
                    <PopoverTrigger>
                        <IconButton
                        aria-label={`Remove ${student.username}`}
                        icon={<FontAwesomeIcon icon={faUser} />}
    
                        borderRadius="full"
                        bg="gray.200"
                        mr={2}
                        />
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Confirmation!</PopoverHeader>
                    <PopoverBody>Are you sure you want to remove student</PopoverBody>
                    <Button>yes</Button>
                    <Button>no</Button>
                </PopoverContent>
                </Popover>
              </Tooltip>
            ))}
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export  {UpdateCourse}
