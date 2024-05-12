import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../redux/action";
import { Box, Button, Heading, Image,Input,Select,Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Courses() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError, isLoading, courses } = useSelector((state) => state.Courses);
  const [page, setPage] = useState(1);
  const [search, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    dispatch(getCourses(page,search,sortBy,sortOrder));
    console.log("useEffect called");
  }, [search, sortBy, sortOrder, page]);
 
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      getCourses();
    }, 1000); // Adjust the debounce delay as needed (in milliseconds)
    
    return () => clearTimeout(delaySearch); // Clear timeout on unmount or when searchTerm changes
  }, [search, sortBy, sortOrder, page]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleOrderChange = (event) => {
    setSortOrder(event.target.value);
  };
  {
    isError && <h1>someThing went wrong...</h1>;
  }
  {
    isLoading && <h1>Loading ...</h1>;
  }
  const handleClick = (id) => {

    navigate(`/courses/${id}`);

  };
  return (
    <Box textAlign={"center"} backgroundColor={"#1a202c"} color={"#fff"} >
      <Box width={"90%"} margin={"auto"}>
      <Box  display={'flex'} flexDirection={{
          base: 'column',
          sm: 'column',
          md: 'row',
          lg: 'row',
          xl: 'row',
          '2xl': 'row'
        }}
         width={{
          base: '75%',
          sm: '60%',
          md: '70%',
          lg: '45%',
          xl: '45%',
          '2xl': '45%'
        }} margin={"auto"} gap={"30px"}  mb={"20px"}>
      <Box  width={{
          base: '250px',
          sm: '300px',
          md: '200px',
          lg: '300px',
          xl: '300px',
          '2xl': '300px'
        }}>
        <Input mt={"20px"}
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearchChange}
        />
      </Box>
      <Box display={"flex"} gap={"10px"}  width={{
          base: '250px',
          sm: '300px',
          md: '300px',
          lg: '300px',
          xl: '300px',
          '2xl': '300px'
        }}>
        <Select value={sortBy} onChange={handleSortChange}  mt={"20px"} width={{
          base: '250px',
          sm: '200px',
          md: '200px',
          lg: '300px',
          xl: '300px',
          '2xl': '300px'
        }}>
          <option style={{backgroundColor:"#1a202c", color:"#fff"}} value="">Sort by</option>
          <option style={{backgroundColor:"#1a202c", color:"#fff"}} value="price">Price</option>
          <option style={{backgroundColor:"#1a202c", color:"#fff"}} value="educator">Educator</option>
        </Select>
        <Select value={sortOrder} onChange={handleOrderChange} mt={"20px"} width={{
          base: '250px',
          sm: '200px',
          md: '200px',
          lg: '300px',
          xl: '300px',
          '2xl': '300px'
        }} >
          <option style={{backgroundColor:"#1a202c", color:"#fff"}} value="asc">Low to High</option>
          <option style={{backgroundColor:"#1a202c", color:"#fff"}} value="desc">High to Low</option>
        </Select>
      </Box>
    </Box>
        <Button mr={5} onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : prev))}>
          {" "}
          prev
        </Button>
        {page}
        <Button  ml={5}onClick={() => setPage((prev) => prev + 1)}> next</Button>
      <Heading>Courses  we offer</Heading>
      <Box
        display={"grid"}
        gridTemplateColumns = {{
          base: 'repeat(1,1fr)',
          sm: 'repeat(1,1fr)',
          md: 'repeat(2,1fr)',
          lg: 'repeat(3,1fr)',
          xl: 'repeat(3,1fr)',
          '2xl': 'repeat(3,1fr)'
        }}
        // gridTemplateColumns={"repeat(3,1fr)"}
        gap={"20px"}
        padding={"10px"}
        textAlign={"center"}
       
      >
        {courses?.map((course) => (
          <Box
            key={course._id}
            boxShadow='xl' p='6' rounded='md' bg='white'
            padding={"5px"}
          >
            <Image src={course.imageUrl} width={"100%"}/>
            <Box width={"80%"} margin={"auto"} textAlign={"center"}>  
            <Text color={'black'}fontSize={"20"} fontWeight={"medium"}>{course.courseName}</Text>
            </Box>
            <Text  color={'black'} >{course.educator}</Text>
            <Text color={'black'}>{`course fees:${course.price} ₹`}</Text>
            <Box color={'black'} height={'60px'} width={"80%"} margin={"auto"} textAlign={"center"}>
              <Text>
               What You will learn :
              {course.techStack.map((tech) => {
                let newString = "";
                return (newString += tech + " ");
              })}
              </Text>
            </Box>
            <Button onClick={() => handleClick(course._id)} mt={"10px"}color={"white"} backgroundColor={"#196ae5"} >
              view all details
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
    </Box>
  );
}

export default Courses;
