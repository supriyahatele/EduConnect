import  { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Contexts/AuthContextProvider'
import axios from 'axios'
import { Box } from '@chakra-ui/react'
import { MyCourseCard } from './MyCourseCard'


const MyCourses = () => {
    const {authUser} = useContext(AuthContext)
    const [myCourses,setMyCourses] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
    useEffect(()=>{
        setLoading(true);
        axios.get(`http://localhost:3000/courses/mycourses`,{
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
    if(loading) return <Box>loading</Box>
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
