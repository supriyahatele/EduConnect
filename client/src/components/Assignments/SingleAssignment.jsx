import { useContext, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faClock, faInfoCircle, faUserCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { Box,Button,Flex,FormLabel,Heading,IconButton,Input,Spinner,Text, useDisclosure, useToast } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom'
import { BASEURL } from '../../config'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
   
  } from '@chakra-ui/react'
import { AuthContext } from '../../Contexts/AuthContextProvider';
import axios from 'axios';
const initialState = {
    isLoading: false,
    data:{},
    isError: false,
}
const SingleAssignment = () => {
    const {id,assignment_id} = useParams();
    const [submittedUrl,setSubmittedUrl] = useState('');
    const navigate = useNavigate()
    const toast = useToast()
    const url = useRef('');
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {authUser} = useContext(AuthContext);
    const [assignment,setAssignment] = useState(initialState)
    useEffect(()=>{
        setAssignment(prev => ({
            ...prev,
            isError:false,
            isLoading:true
        }))
        axios.get(`${BASEURL}/courses/${id}/getAssignment/${assignment_id}`,{
            headers : {
                'Authorization':`Bearer ${authUser.token}`
            }
        }).then((response) => {
            console.log(response.data);
            if(response.data.msg){
                setAssignment(prev => ({
                    ...prev,
                    isLoading:false,
                    isError:true
                }))
            }else{
                setAssignment(prev => ({
                    ...prev,
                    isLoading:false,
                    isError:false,
                    data:response.data.assignment
                }))
            }
        })
        .catch(err => {
            console.log(err);
            setAssignment(prev => ({
                ...prev,
                isLoading:false,
                isError:true
            }))
        })
        fetchSubmission();

    },[id,authUser])

    const fetchSubmission = () =>{
     
        axios.get(`${BASEURL}/submissions/submit/${assignment_id}`,{
            headers : {
                'Authorization':`Bearer ${authUser.token}`
            }
        })
        .then(res => {
            if(res.data.message){
                console.log(res.data.message);
                return 
            }else{
                console.log(res.data.submissionUrl);
                setSubmittedUrl(res.data?.submissionUrl || '')
                console.log(url);
                
            }
        })
        .catch(err => console.log(err))
    }
    const handleSubmit = () => {
        axios.post(`${BASEURL}/submissions/submit/${assignment_id}`,{submissionUrl:url.current},{
            headers : {
                'Authorization':`Bearer ${authUser.token}`
            }
        })
        .then(res => {
            if(res.data.error){
                return alert(res.data.error)
            }
            setSubmittedUrl(url.current)
            console.log(res.data.submitted);
           
            toast({
              title: 'assignment',
              description:res.data.msg,
              status: 'success',
              duration: 9000,
              isClosable: true,
            })

        })
        .catch(err => {
            console.log(err);
        })

    }
    const handleEditUrl = () => {
      console.log(assignment_id);
        axios.patch(`${BASEURL}/submissions/updateSubmission/${assignment_id}`,{submissionUrl:url.current},{
            headers : {
                'Authorization':`Bearer ${authUser.token}`
            }
        })
        .then(res => {
            if(res.data.msg){
              toast({
                title: 'assignment',
                description:res.data.msg,
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
                setSubmittedUrl(url.current)
                return 
            }else{
               
                console.log(res.data.error);
                
            }
        })
        .catch(err => console.log(err))


    }

    if(assignment.isLoading) return <Box textAlign={'center'}>
    <Spinner
   thickness='4px'
   speed='0.65s'
   emptyColor='gray.200'
   color='blue.500'
   size='xl'
   
   />
 </Box>
    if(assignment.isError) return <Box>error</Box>
  return (
    <>
    <Button m={2} size={'sm'} bgColor={'blue.600'} onClick={() => navigate(-1)}>Go Back</Button>
    <Box p={4} borderWidth="1px" borderRadius="md" boxShadow="md" bg={"#1a202c"} color={"#fff"} >
       <Flex alignItems="center" mb={2}>
         <FontAwesomeIcon icon={faUserCircle} />
      <Text ml={2}>{assignment.data.username}</Text>
    </Flex>
    <Text fontWeight="bold" fontSize="lg" mb={2}>{assignment.data.title}</Text>
    <Text mb={2}>{assignment.data.description}</Text>
    <Text mb={2}>{assignment.data.body || ''}</Text>
   
    <Flex alignItems="center" mb={2}>
    <FontAwesomeIcon icon={faClock} />
      <Text ml={2}>Assigned: {assignment.data.assigningTime}</Text>
    </Flex>
    <Flex alignItems="center" mb={2}>
    <FontAwesomeIcon icon={faClock} />
      <Text ml={2}>Due: {assignment.data.submissionTime}</Text>
    </Flex>
    <Flex justifyContent="flex-end" mt={4}>
      <IconButton
        aria-label="Submit assignment"
        icon={<FontAwesomeIcon icon={faUser} />}
        mr={2}
      />
      <IconButton
        aria-label="View details"
        icon={<FontAwesomeIcon icon={faInfoCircle} />}
      />
    </Flex>
    <FormLabel>url</FormLabel>
    <Input onChange={(e) => url.current = e.target.value}/>
    {submittedUrl?
     <>
        <Button onClick={onOpen} m={3}>Edit</Button> 
        <AlertDialog
        isOpen={isOpen}
        
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              update url
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button  onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='blue' onClick={() => {onClose();handleEditUrl()}} ml={3}>
                Update
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
     </>:
      <Button mt={2} onClick={handleSubmit} m={3}>submit</Button>}
    {submittedUrl && <Heading size={'sm'} color={'green'}>submitted url : {submittedUrl}</Heading>}
   
  </Box>
  </>
);
}

export  {SingleAssignment}
