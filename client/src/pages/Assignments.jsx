
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { AuthContext } from '../Contexts/AuthContextProvider';

import { Box, Button, Center, useDisclosure } from '@chakra-ui/react';
import { AssignmentList } from '../components/Assignments/AssignmentList';
import { AssignmentCreate } from '../components/Assignments/AssignmentCreate';

const initialState = {
    isLoading : false,
    data : [],
    isError : false,
}
const Assignments = () => {
    const {id} = useParams();
    const {authUser} = useContext(AuthContext)
    const {isOpen,onOpen,onClose} = useDisclosure()
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
    const handleAddAssignment = (payload) => {

        axios.post(`http://localhost:3000/courses/${id}/createAssignment`,payload,{
            headers:{
              'Authorization' : `Bearer ${authUser.token}`
            }
        })
        .then((res)=>{
            if(res.data.error){
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
                    data : [...prev.data,res.data]
                }))
                console.log(res.data.assignment);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/assignments/deleteAssignment/${id}`,{
            headers:{
              'Authorization' : `Bearer ${authUser.token}`
            }
        })
        .then((res)=>{
            if(res.data.error){
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
                    data : prev.data.filter(assignment => assignment._id === id ? false : true)
                }))
                console.log(res.data.assignment);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
    if(assignments.isLoading) return <Center>loading</Center>
    if(assignments.isError) return <Center>error</Center>
  return (
    <div>
        {authUser.role == 'educator' && <Box textAlign={'center'} m={3}><Button onClick={onOpen} p={2} >Add Assignment</Button></Box>}
        {isOpen &&<AssignmentCreate isOpen={isOpen} onClose={onClose} handleAddAssignment={handleAddAssignment} />}
     <AssignmentList assignments={assignments.data} handleDelete={handleDelete}/>
    </div>
  )
}

export  {Assignments}
