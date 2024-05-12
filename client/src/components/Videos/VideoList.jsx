
import {Box, Button, Heading, IconButton, useDisclosure} from '@chakra-ui/react'
import { faClock, faInfoCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContextProvider';
import { CreateVideo } from './CreateVideo';
const VideoList = ({videos,addVideo}) => {
    console.log(videos);
    const {authUser} = useContext(AuthContext)
   const navigate = useNavigate()
   const {isOpen,onOpen,onClose} = useDisclosure()
  return (
    <div>
         <Button m={2} bgColor={'blue.600'} size={'sm'} onClick={() => navigate(-1)}>Go Back</Button>
        
    {authUser.role === 'educator' && (
  <>
    <Box textAlign={'center'}>
        <Button onClick={onOpen} mt={4}>
          Add Video
        </Button>
    </Box>
    {isOpen && (
      <CreateVideo isOpen={isOpen} onClose={onClose} addVideo={addVideo} />
    )}
  </>
)}
        {videos.map(video => {
            return (
                <Box
                key={video._id}
            
                bg="#1a202c"
                color="#fff"
                display="flex"
                flexDir="column"
                gap={3}
                justifyContent="center"
                p={4}
                borderRadius="md"
             
               
              >
                <Heading size="md" mb={2}>
                  {video.title}
                </Heading>
                <Box display="flex" alignItems="center">
                  <FontAwesomeIcon icon={faUser} mr={2} />
                  <Heading size="sm" mr={4}>
                    {video.educator}
                  </Heading>
                  {video.time && (
                    <>
                      <FontAwesomeIcon icon={faClock} mr={2} />
                      <Heading size="sm">{video.time}</Heading>
                    </>
                  )}
                </Box>
                <Button  _hover={{ bg: '#2d3748' }} onClick={() =>navigate(`${video._id}`)}>Show</Button>
              </Box>
            )
        })}
      
    </div>
  )
}

export  {VideoList}
