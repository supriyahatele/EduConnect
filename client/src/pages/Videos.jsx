
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { VideoList } from '../components/Videos/VideoList';
import { AuthContext } from '../Contexts/AuthContextProvider';
import { Box, Spinner, useToast } from '@chakra-ui/react';
import { BASEURL } from '../config'
const initialState = {
  isLoading: false,
  data : [],
  isError: false,
}
const Videos = () => {
    const {id} = useParams();
    const toast = useToast()
    const [videos,setVideos] = useState(initialState)
    const {authUser} = useContext(AuthContext)
    useEffect(()=>{
      setVideos(prev =>({
        ...prev,
        isLoading: true,
        isError:false
      }))
      axios.get(`${BASEURL}/courses/${id}/videos`,{
        headers:{
          'Authorization' : `Bearer ${authUser.token}`
        }
      })
      .then((res) => {
        setVideos(prev => ({
          ...prev,
          isLoading: false,
          isError:false,
          data : res.data
        }))
      })
      .catch(err => {

        setVideos(prev => ({
          ...prev,
          isLoading: false,
          isError:true
        }))
      })

    },[id,authUser])

    const addVideo = (payload) => {
      setVideos(prev => ({
        ...prev,
        isLoading: false,
        isError:false,
        data : [...prev.data,payload]
      }))
      toast({
        title: 'Video added.',
        description: "You've added a video.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
    const handleDelete = (video_id) => {
      axios.delete(`${BASEURL}/courses/${id}/videos/${video_id}`,{
        headers:{
          'Authorization' : `Bearer ${authUser.token}`
        }
      })
      .then((res) => {
        setVideos(prev => ({
          ...prev,
          isLoading: false,
          isError:false,
          data : prev.data.filter(video => video._id == video_id ? false : true)
        }))
        toast({
          title : 'deleted video',
          description : res.data.message,
          status : 'error',
          duration: 3000,
          isClosable: true,
        })
      })
      .catch(err => {

        setVideos(prev => ({
          ...prev,
          isLoading: false,
          isError:true
        }))
        console.log(err);
      })

    }

    if(videos.isLoading) return <Box textAlign={'center'}>
    <Spinner
   thickness='4px'
   speed='0.65s'
   emptyColor='gray.200'
   color='blue.500'
   size='xl'
   
   />
 </Box>
    if(videos.isError) return <h2>error</h2>
  return (
    <>
    <VideoList videos={videos.data} addVideo={addVideo} handleDelete={handleDelete}/>
    </>
   
  )
}

export  {Videos}
