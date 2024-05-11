import  { useContext, useState } from 'react';
import { Box, Center,Image, VStack, FormControl, Input, Button, Text, Icon, Heading } from '@chakra-ui/react';
import { EmailIcon, LockIcon } from '@chakra-ui/icons'; 
import { Link, useNavigate} from 'react-router-dom'
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
    axios.post('http://localhost:3000/users/login',formData)
    .then((res) => {
      loginUser(res.data.refreshToken)
      navigate('/');
    })
    .catch(err => {
      console.log(err);
    })
  };

  const handleFocus = (e) => {
    e.target.placeholder = '';
  };

  const handleBlur = (e) => {
    e.target.placeholder = e.target.name === 'email' ? 'Enter your email' : 'Enter your password';
  };

  return (
    <Box bgColor={''}>
    <Box minHeight="95vh"  display="flex" alignItems="center" justifyContent="center" >
      <Box w="90%" p="4" display="flex">
      
        <Box p="6" bg="white" borderRadius="md" boxShadow = "rgba(3, 102, 214, 0.3) 0px 0px 0px 3px" maxW={'500px'} flexGrow={1} bgColor={''}>
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
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  bgColor={'aliceblue'}
                  borderBottom={'1px solid aliceblue'}
                  _placeholder={{ color: 'inherit' }}
                  placeholder="Enter your email"
                  leftIcon={<EmailIcon color="gray" />}
                />
              </FormControl>
              <FormControl isRequired>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  bgColor={'aliceblue'}
                  onBlur={handleBlur}
                  _placeholder={{ color: 'inherit' }}
                  placeholder="Enter your password"
                  leftIcon={<LockIcon color="gray.500" />}
                />
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
