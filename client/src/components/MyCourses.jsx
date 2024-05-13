import  { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Contexts/AuthContextProvider'
import axios from 'axios'
import { Box, Spinner } from '@chakra-ui/react'
import { MyCourseCard } from './MyCourseCard'
import { BASEURL } from '../config'

const MyCourses = () => {
    const {authUser} = useContext(AuthContext)
    const [myCourses,setMyCourses] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
    useEffect(()=>{
        setLoading(true);
        axios.get(`${BASEURL}/courses/mycourses`,{
            headers : {
                'Authorization' : `Bearer ${authUser.token}`
            }
        })
        .then(res => {
            setLoading(false);
            setError(false);
            setMyCourses(res.data)
            console.log(res.data);
        })
        .catch(err =>{
            console.log(err);
            setError(true)
            setLoading(false);
        })

    },[authUser])
    if(loading) return <Box textAlign={'center'}>
    <Spinner
   thickness='4px'
   speed='0.65s'
   emptyColor='gray.200'
   color='blue.500'
   size='xl'
   
   />
 </Box>
    if(error) return <Box>error</Box>
  return (
    <Box display={'flex'} flexWrap={'wrap'} alignItems={'center'}  p={4} gap={4} justifyContent={'center'}>
      {myCourses.map(course => {
        return <MyCourseCard key={course._id} course={course}/>
      })}
    </Box>
  )
}

export default MyCourses
