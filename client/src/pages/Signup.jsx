
import { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Checkbox, CheckboxGroup, Select, Button, Heading, Text, Image, InputLeftElement, InputGroup } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { extendTheme } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASEURL } from '../config'
const technologies = ['React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Java'];

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    interests: [],
    role: 'student',
    age: ''
  });
  const breakpoints = {
    base: '0px',
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px'
  }
  const theme = extendTheme({ breakpoints })
const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInterestChange = (selectedInterests) => {
    setFormData({
      ...formData,
      interests: selectedInterests,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${BASEURL}/users/register`, formData)
    .then(res => {
      if(res.data.message ){
        console.log(res.data.message);
        navigate('/login')
      }else{
        console.log(res.data.error);
      }
    } )
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" flexDirection={{base:'column-reverse',md:'row'}}  minHeight="100vh" bg={"#1a202c"} color={"#fff"}>
      {/* Text Area */}
      <Box className="text-area" w="50%" h={'85vh'} p={8} borderRadius={8}  >
        <Image src="/login_logo.png" alt="logo" w="200px" mb={4} />
    
        <Heading as="h2" size="lg" mb={4} mt={'-7'} color="white">
          Grow your skill with our best mentors
        </Heading>
        <Text color="#8c7f7b" fontSize="md" mb={4}>
          The primary objective of EduConnect is to provide a centralized platform for high-quality online education, allowing users to enroll in courses and participate in collaborative learning activities.
        </Text>
      </Box>

      {/* Form */}
      <Box w={{base:'80%',md:'40%'}} p={8} borderWidth={1}  borderRadius={8}  boxShadow= "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset" >
        <form onSubmit={handleSubmit} >
          <Box display={'flex'} flexDir={'column'} gap={5} >
            <FormControl isRequired >
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FontAwesomeIcon icon={faUser} color="gray.300" />} />
                <Input type="text" name="username"  _placeholder={{ color: 'inherit' }} placeholder='enter username' value={formData.username} onChange={handleChange} />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FontAwesomeIcon icon={faLock} color="gray.300" />} />
                <Input type="password" name="password"  _placeholder={{ color: 'inherit' }} placeholder='enter password' value={formData.password} onChange={handleChange} />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FontAwesomeIcon icon={faEnvelope} color="gray.300" />} />
                <Input type="email" name="email" value={formData.email} onChange={handleChange}   _placeholder={{ color: 'inherit' }} placeholder='enter your email' />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Interests</FormLabel>
              <CheckboxGroup value={formData.interests} onChange={handleInterestChange}>
                {technologies.map((interest, index) => (
                  <Checkbox key={index} value={interest} ml={1} colorScheme="teal">
                    {interest}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </FormControl>
            <FormControl isRequired>
              <Select name="role" value={formData.role} onChange={handleChange}>
                <option value="student">Student</option>
                <option value="educator">Educator</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Age</FormLabel>
              <Input type="number" name="age" value={formData.age}  _placeholder={{ color: 'inherit' }} placeholder='enter your age' onChange={handleChange} />
            </FormControl>
            <Box>
            <Button w={'49%'} type="submit" bgColor="orangered" color={'white'}>
              Register
            </Button>
            <Button w={'49%'} ml={1} type="submit" border={'1px solid blue'} color={'blue'} onClick={()=>navigate('/login')}>
              Login
            </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
export default Signup;
