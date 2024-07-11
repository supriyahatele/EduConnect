
import { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../redux/action";
import { Box, Button, Heading, useDisclosure, Image,Input,Select,Text, useToast, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CourseCreate } from "../components/CourseCreate";
import { postCourse } from '../redux/action';
import { useState } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";
function Courses() {
  const navigate = useNavigate();
  const { authUser } = useContext(AuthContext)
  const dispatch = useDispatch();
  const id = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isError, isLoading, courses } = useSelector((state) => state.Courses);
  const [page, setPage] = useState(1);
  const [search, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const toast = useToast()
  useEffect(() => {
    dispatch(getCourses(page, search, sortBy, sortOrder));
    console.log("useEffect called");
  }, [ search,sortBy, sortOrder, page]);

  useEffect(() => {
      clearTimeout(id.current)
      id.current = setTimeout(() => {
        getCourses();
    }, 2000); 

    return () => clearTimeout(id.current); // Clear timeout on unmount or when searchTerm changes
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
  const handleAddCourse = (payload) => {
    dispatch(postCourse(payload))
    toast({
      title: 'Course created.',
      description: "You have successfully added a course",
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }
  const handleClick = (id) => {

    navigate(`/courses/${id}`);

  };

  console.log(courses);
  if (isLoading) return<Box textAlign={'center'}>
     <Spinner
    thickness='4px'
    speed='0.65s'
    emptyColor='gray.200'
    color='blue.500'
    size='xl'
    
    />
  </Box>
  if (isError) return <div>error</div>
  return (
    <Box textAlign={"center"} backgroundColor={"#1a202c"} color={"#fff"} >
      <Box width={"90%"} margin={"auto"}>
        {authUser.role === 'educator' && (
          <>
            <Button onClick={onOpen} mt={4}>
              Add Course
            </Button>
            {isOpen && (
              <CourseCreate isOpen={isOpen} onClose={onClose} handleAddCourse={handleAddCourse} />
            )}
          </>
        )}
        <Box display={'flex'} flexDirection={{
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
          }} margin={"auto"} gap={"30px"} mb={"20px"}>
          <Box width={{
            base: '250px',
            sm: '300px',
            md: '200px',
            lg: '300px',
            xl: '300px',
            '2xl': '300px'
          }}>
            <Input mt={"20px"}
              type="text"
              placeholder="Search course..."
              value={search}
              onChange={handleSearchChange}
            />
          </Box>
          <Box display={"flex"} gap={"10px"} width={{
            base: '250px',
            sm: '300px',
            md: '300px',
            lg: '300px',
            xl: '300px',
            '2xl': '300px'
          }}>
            <Select value={sortBy} onChange={handleSortChange} mt={"20px"} width={{
              base: '250px',
              sm: '200px',
              md: '200px',
              lg: '300px',
              xl: '300px',
              '2xl': '300px'
            }}>
              <option style={{ backgroundColor: "#1a202c", color: "#fff" }} value="">Sort by</option>
              <option style={{ backgroundColor: "#1a202c", color: "#fff" }} value="price">Price</option>
              <option style={{ backgroundColor: "#1a202c", color: "#fff" }} value="educator">Educator</option>
            </Select>
            <Select value={sortOrder} onChange={handleOrderChange} mt={"20px"} width={{
              base: '250px',
              sm: '200px',
              md: '200px',
              lg: '300px',
              xl: '300px',
              '2xl': '300px'
            }} >
              <option style={{ backgroundColor: "#1a202c", color: "#fff" }} value="asc">Low to High</option>
              <option style={{ backgroundColor: "#1a202c", color: "#fff" }} value="desc">High to Low</option>
            </Select>
          </Box>
        </Box>
        <Button mr={5} onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : prev))}>
          {" "}
          prev
        </Button>
        {page}
        <Button ml={5} onClick={() => setPage((prev) => prev + 1)}> next</Button>
        <Heading>Courses  we offer</Heading>
        <Box
          display={"grid"}
          gridTemplateColumns={{
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
              key={course?._id}
              boxShadow='xl' p='6' rounded='md' bg='white'
              padding={"5px"}
            >
              <Image src={course.imageUrl} width={"100%"} />
              <Box width={"80%"} margin={"auto"} textAlign={"center"}>
                <Text color={'black'} fontSize={"20"} fontWeight={"medium"}>{course.courseName}</Text>
              </Box>
              <Text color={'black'} fontWeight={"medium"} >{` Instructor ${course.educator}`}</Text>
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
              <Button onClick={() => handleClick(course._id)} mt={"10px"} color={"white"} backgroundColor={"#196ae5"} >
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
