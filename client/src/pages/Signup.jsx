
import { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  VStack,
  Checkbox,
  CheckboxGroup,
} from '@chakra-ui/react';

const technologies = ['React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Java', 'C#', 'Ruby'];

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    interests: [],
    role: 'student',
    age: ''
  });

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
    console.log(formData);
  };

  return (
    <Box p={8} borderWidth={1} borderRadius={8} boxShadow="md">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl >
            <FormLabel>Interests</FormLabel>
            <CheckboxGroup value={formData.interests} onChange={handleInterestChange}>
              {technologies.map((interest,index) => (
                <Checkbox key={index} value={interest}>
                  {interest}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Role</FormLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="student">Student</option>
              <option value="educator">Educator</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Age</FormLabel>
            <Input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </FormControl>
          <Button type="submit" colorScheme="teal">
            Register
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Signup;
