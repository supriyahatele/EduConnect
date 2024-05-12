
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { AuthContext } from '../Contexts/AuthContextProvider';

import { Center } from '@chakra-ui/react';
import { AssignmentList } from '../components/Assignments/AssignmentList';

const initialState = {
    isLoading : false,
    data : [],
    isError : false,
}
const Assignments = () => {
    const {id} = useParams();
    const {authUser} = useContext(AuthContext)
   console.log(authUser);
    const [assignments,setAssignments] = useState(initialState)
  
    useEffect(()=>{
        setAssignments(prev => ({
            ...prev,
            isLoading : true
        }))
        axios.get(`http://localhost:3000/courses/${id}/getAssignment`,{
            headers:{
              'Authorization' : `Bearer ${authUser.token}`
            }
        })
        .then((res)=>{
            if(res.data.msg){
                setAssignments(prev => ({
                    ...prev,
                    isLoading : false,
                    isError:true
                }))

            }else{
                setAssignments(prev => ({
                    ...prev,
                    isLoading : false,
                    isError:false,
                    data : res.data.assignment
                }))
                console.log(res.data.assignment);
            }
        })
        .catch(err => {
            console.log(err);
        })

    },[id,authUser])

    if(assignments.isLoading) return <Center>loading</Center>
    if(assignments.isError) return <Center>error</Center>
  return (
    <div>
     <AssignmentList assignments={assignments.data}/>
    </div>
  )
}

export  {Assignments}
