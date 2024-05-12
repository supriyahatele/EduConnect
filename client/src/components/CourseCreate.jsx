import { useState } from 'react';
import { 
    Box,
    Button,
    Center,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    Modal,
    ModalContent,
    ModalOverlay,
    
  } from '@chakra-ui/react';


const CourseCreate = ({isOpen,onClose,handleAddCourse}) => {
    const [formData, setFormData] = useState({
        courseName: '',
        educator: '',
        price: 0,
        techStack: [],
        imageUrl: '',
        rating: 0,
        reviews: 0,
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        if(name === 'techStack'){
            const arr = value.split(',');
            console.log(arr);
            setFormData({
                ...formData,
                [name] : arr
            })
        }else{
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    }
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
       handleAddCourse(formData)
        onClose();
      };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay /> 
  <ModalContent>
        <Center pt={4} color={'green'} fontWeight={'bold'}>Add Course Details</Center>
    <Box maxW={{ base: "100%", md: "md" }} mx="auto" mt={8} p={4} borderWidth="1px" borderRadius="lg">
    <form onSubmit={handleSubmit}>
      <FormControl isRequired>
        <FormLabel>Course Name</FormLabel>
        <Input
          type="text"
          name="courseName"
          value={formData.courseName}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl mt={4} isRequired>
        <FormLabel>Educator</FormLabel>
        <Input
          type="text"
          name="educator"
          value={formData.educator}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl mt={4} isRequired>
        <FormLabel>Price</FormLabel>
        <InputGroup>
          <Input
            type='number'
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
         
        </InputGroup>
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Tech Stack</FormLabel>
        <Input
          type="textarea"
          name="techStack"
          value={formData.techStack}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Image URL</FormLabel>
        <Input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Rating</FormLabel>
        <Input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Reviews</FormLabel>
        <Input
          type="number"
          name="reviews"
          value={formData.reviews}
          onChange={handleChange}
        />
      </FormControl>

      <Button mt={6} colorScheme="teal" type="submit">
        Submit
      </Button>
    </form>
  </Box>
  </ModalContent>
  </Modal>
  )
}

export  {CourseCreate}
