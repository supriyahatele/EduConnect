import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContextProvider';
import { Box, IconButton, useDisclosure } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';

const SingleVideo = () => {

    const {authUser} = useContext(AuthContext)
    const { isOpen, onToggle } = useDisclosure();
    const [video,setVideo] = useState({isLoading:false,data:{},isError:false})
    const {id,video_id} = useParams();
    useEffect(()=>{
        setVideo(prev =>({
            ...prev,
            isLoading: true,
            isError:false
          }))
          axios.get(`http://localhost:3000/courses/${id}/videos/${video_id}`,{
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
    if(video.isLoading) return <Box>loading</Box>
    if(video.isError) return <Box>error</Box>
  return (
    <Box display={'flex'} justifyContent={'center'}>
     <video width="400" controls>
        <source src = {video.data.videoUrl} type="video/mp4"/>
     </video>
     </Box>
  );
};
export default SingleVideo
