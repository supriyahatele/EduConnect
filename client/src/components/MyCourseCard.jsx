import { Box, Image, Text, Flex, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const MyCourseCard = ({course}) => {
    const navigate = useNavigate();
    console.log(course);
    return (
    <Box
    w={'250px'}
    borderWidth="1px"
    borderRadius="lg"
    bg={"#1a202c"} color={"#fff"}
    p="4"
    display={'flex'}
    flexDir={'column'}
    justifyContent={'space-between'}
    gap={5}
    mb={{ base: "4", md: "0" }}
    >
    <Image src={course.imageUrl} alt={course.courseName} />
    <Box mt="2" fontWeight="semibold" as="h4" lineHeight="tight" fontSize="lg">
      {course.courseName}
    </Box>
      <Text ml="2" fontSize="sm">{course.educator}</Text>

      <Button onClick={() => navigate(`/courses/${course._id}`)}>show more</Button>
  </Box>
)};



export  {MyCourseCard}
