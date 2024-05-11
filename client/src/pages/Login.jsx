// LoginForm.js

import  { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth="1px" rounded="md">
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl isRequired mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit" mt={6} colorScheme="teal">
          Login
        </Button>
      </form>
      <Text mt={4} textAlign="center">
        Don't have an account?{' '}
        <Link to="/signup" color="teal.500">
          Register here
        </Link>
      </Text>
    </Box>
  );
};

export default Login;
