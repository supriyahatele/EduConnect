import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContextProvider';
import { Box, Button, Heading, Text, Spinner, useDisclosure } from '@chakra-ui/react';

import { BASEURL } from '../../config'
import axios from 'axios';

const SingleVideo = () => {

    const {authUser} = useContext(AuthContext)
    const { isOpen, onToggle } = useDisclosure();
    const [video,setVideo] = useState({isLoading:false,data:{},isError:false})
    const {id,video_id} = useParams();
    const navigate = useNavigate()
    useEffect(()=>{
        setVideo(prev =>({
            ...prev,
            isLoading: true,
            isError:false
          }))
          axios.get(`${BASEURL}/courses/${id}/videos/${video_id}`,{
            headers:{
              'Authorization' : `Bearer ${authUser.token}`
            }
          })
          .then((res) => {
            console.log(res.data);
            setVideo(prev => ({
              ...prev,
              isLoading: false,
              isError:false,
              data : res.data
            }))
          })
          .catch(err => {
    
            setVideo(prev => ({
              ...prev,
              isLoading: false,
              isError:true
            }))
          })


    },[video_id,authUser])
    if(video.isLoading) return <Box textAlign={'center'}>
    <Spinner
   thickness='4px'
   speed='0.65s'
   emptyColor='gray.200'
   color='blue.500'
   size='xl'
   
   />
 </Box>
    if(video.isError) return <Box>error</Box>
  return (
    <>
    <Heading p={2} color="#1a202c">{video.title}</Heading>
    <Box display={'flex'} justifyContent={'center'} >
     <video width="400" controls>
        <source src = {video.data.videoUrl} type="video/mp4"/>
     </video>
     </Box>
     <Text>{video.notes}</Text>
     <Button m={2} size={'sm'} bgColor={'blue.600'} onClick={() => navigate(-1)}>Go Back</Button>
     </>
  );
};
export default SingleVideo
