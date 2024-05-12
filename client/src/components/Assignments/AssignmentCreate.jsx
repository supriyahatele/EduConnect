import { useState } from 'react';
import { 
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
    
  } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


const AssignmentCreate = ({isOpen,onClose,handleAddAssignment}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [body, setBody] = useState('');
  
    const handleCreate = () => {
      handleAddAssignment({ title, description, body });
      onClose();
    };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Item</ModalHeader>
        <ModalBody>
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            mb={4}
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            mb={4}
          />
          <Textarea
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            size="lg"
            resize="vertical"
            height="200px"
            mb={4}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleCreate}>
            Create
          </Button>
          <Button onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} /> Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export  {AssignmentCreate}
