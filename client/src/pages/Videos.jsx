
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { VideoList } from '../components/Videos/VideoList';
import { AuthContext } from '../Contexts/AuthContextProvider';
import { useToast } from '@chakra-ui/react';
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
      axios.get(`http://localhost:3000/courses/${id}/videos`,{
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
    if(videos.isLoading) return <h1>loading</h1>
    if(videos.isError) return <h2>error</h2>
  return (
    <>
    <VideoList videos={videos.data} addVideo={addVideo}/>
    </>
   
  )
}

export  {Videos}
