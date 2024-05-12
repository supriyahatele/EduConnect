
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../redux/action";
import { Box, Button, Heading, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CourseCreate } from "../components/CourseCreate";
import { postCourse } from '../redux/action';
function Courses() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isOpen,onOpen,onClose} = useDisclosure()
  const { isError, isLoading, courses } = useSelector((state) => state.Courses);
  useEffect(() => {
    dispatch(getCourses());
    console.log("useEffect called");
  }, []);
  // console.log(state)
  const handleAddCourse = (payload) => {
    dispatch(postCourse(payload))
  }
  const handleClick = (id) => {
    navigate(`/courses/${id}`);
  };
  console.log(courses);
  if(isLoading ) return <div>loading...</div>
  if(isError) return <div>error</div>
  return (
    <Box width={"90%"} margin={"auto"} textAlign={"center"}>
      <Heading>Courses</Heading>
      <Button onClick={onOpen}>Add Course</Button>
      {isOpen && <CourseCreate isOpen={isOpen} onClose = {onClose} handleAddCourse={handleAddCourse} />}
      <Box
        display={"grid"}
        gridTemplateColumns={"repeat(3,1fr)"}
        gap={"10px"}
        padding={"10px"}
      >
        {courses?.map((course) => (
          <Box
            key={course?._id}
            border={"1px solid black"}
            height={"250px"}
            padding={"20px"}
            width={"400px"}
          >
            <h1>{course?.courseName}</h1>
            <h1>{course?.educator}</h1>
            <h1>{course?.price}</h1>
            <h1>
              {course?.techStack?.map((tech) => {
                let newString = "";
                return (newString += tech + " ");
              })}
            </h1>
            <Button onClick={() => handleClick(course._id)} >
              view all details
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Courses;
