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
    <Box width={"90%"} margin={"auto"}textAlign={"center"} >
      <Box display={'flex'} width={"45%"} margin={"auto"} gap={"30px"} mt={"30px"} mb={"20px"}>
      <Box >
        <Input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearchChange}
        />
      </Box>
      <Box display={"flex"} gap={"10px"}  width={"300px"}>
        <Select value={sortBy} onChange={handleSortChange} >
          <option value="">Sort by</option>
          <option value="price">Price</option>
          <option value="educator">Educator</option>
        </Select>
        <Select value={sortOrder} onChange={handleOrderChange} >
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
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
        gridTemplateColumns={"repeat(3,1fr)"}
        gap={"20px"}
        padding={"10px"}
        textAlign={"center"}
        centerContent={true}
        justifyContent={"center"}
      >
        {courses?.map((course) => (
          <Box
            key={course._id}
            boxShadow='xl' p='6' rounded='md' bg='white'
            padding={"10px"}
          >
            <Image src={course.imageUrl} width={"100%"}/>
            <h1>{course.courseName}</h1>
            <Text fontWeight={"800"}>{course.educator}</Text>
            <h1>{course.price}</h1>
            <h1>
              {course.techStack.map((tech) => {
                let newString = "";
                return (newString += tech + " ");
              })}
            </h1>
            <Button onClick={() => handleClick(course._id)} color={"white"} backgroundColor={"blue.400"} >
              view all details
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Courses;
