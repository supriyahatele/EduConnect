import  { useContext, useState } from 'react';
import { Box,Image, VStack, FormControl, Input, Button, Text, Heading, InputGroup, InputLeftElement } from '@chakra-ui/react';

import { Link, useNavigate} from 'react-router-dom'
import { BASEURL } from '../config'
import axios from 'axios'
import { AuthContext } from '../Contexts/AuthContextProvider';

const Login= () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' });
 const {loginUser} = useContext(AuthContext)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post(`${BASEURL}/users/login`,formData)
    .then((res) => {
      if(res.data.error){
        setFormData({email:'',password:''})
        return alert(res.data.error);
      }
      loginUser(res.data.refreshToken)
      navigate('/');
    })
    .catch(err => {
      console.log(err);
    })
  };



  const handleBlur = (e) => {
    e.target.placeholder = e.target.name === 'email' ? 'Enter your email' : 'Enter your password';
  };

  return (
    <Box bg={"#1a202c"} color={"#fff"}>
    <Box minHeight="95vh"  display="flex" alignItems="center" justifyContent="center" >
      <Box w="90%" p="4" display="flex">
      
        <Box p="6" borderRadius="md" boxShadow = "rgba(3, 102, 214, 0.3) 0px 0px 0px 3px" maxW={'500px'} flexGrow={1} >
          <Text fontSize="sm" color="gray.500" textAlign="center" mb="4">
            Enter your credentials below to login.
          </Text>
          <Image src='/login_logo.png' h={'120px'} w={'120px'}/>
          <Heading fontSize={'larger'} fontWeight={'bold'} mb={'2'} mt={'-4'}>
            LOGIN
          </Heading>
          
          <VStack spacing={4} align="stretch">
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <FormControl isRequired>
                <InputGroup>
              <InputLeftElement pointerEvents="none" />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  bgColor={'aliceblue'}
                  color={'black'}
                  borderBottom={'1px solid aliceblue'}
                  _placeholder={{ color: 'inherit' }}
                  placeholder="Enter your email"
                  
                />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                <InputLeftElement pointerEvents="none"  />
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                color={'black'}
                  bgColor={'aliceblue'}
                  onBlur={handleBlur}
                  _placeholder={{ color: 'inherit' }}
                  placeholder="Enter your password"
                  
                />
                </InputGroup>
              </FormControl>
              <Button type="submit" w={'100%'} bgColor={'orangered'} color={'white'} mt="2" alignSelf="flex-start">
                Login
              </Button>
            </form>
            <Text textAlign="center">
              Don't have an account?{' '}
              <Link to="/signup" color="white">
                Register here
              </Link>
            </Text>
          </VStack>
        </Box>
     
        <Box
         display={{md:'block',sm:'none' , base:'none'}} 
          flexShrink={0}
          w={'50vw'}
          h={'400px'}
          bg="url('/login_hero_img.png')"
          bgSize="contain"
          bgRepeat={'no-repeat'}
          bgPosition="center"
          minHeight="300px"
          borderRadius="md"
        />
      </Box>
    </Box>
    </Box>
  );
};

export default Login;
