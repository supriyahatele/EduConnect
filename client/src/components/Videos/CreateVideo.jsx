import React, { useContext, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, Textarea, Box, Spinner } from "@chakra-ui/react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContextProvider';

const CreateVideo = ({onClose,isOpen,addVideo}) => {
    const [isLoading,setIsLoading] = useState(false);
    const [title,setTitle] = useState('');
    const [notes,setNotes] = useState('');
    const [file,setFile] = useState(null);
    const {id} = useParams();
    const {authUser} = useContext(AuthContext)
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    const videoData = new FormData();
    videoData.append('title',title);
    videoData.append('video',file)
    try {
        setIsLoading(true);
        const response = await axios.post(`http://localhost:3000/courses/${id}/videos/uploads`, videoData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization':`Bearer ${authUser.token}`
          },
        });
        console.log(response.data);
        setIsLoading(false);
        addVideo(response.data);
        onClose(); 
      } catch (error) {
        console.error('Error uploading video:', error);
      }
    };
 if(isLoading) return <Box textAlign={'center'}><Spinner thickness='4px' size={'xl'} /></Box>
    return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Upload Video</ModalHeader>
      <ModalCloseButton />
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <Input type="text" name="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} mb={4} />
          <Textarea name="notes" placeholder="notes" value={notes} onChange={(e)=> setNotes(e.target.value)} mb={4} />
          <Input type="file" name="videoFile" onChange={(e) => setFile(e.target.files[0])} mb={4} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} type="submit">Upload Video</Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </form>
    </ModalContent>
  </Modal>
);
};

export  {CreateVideo}
