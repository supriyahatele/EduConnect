import React from 'react'
import { Box, Button, Center, Container, Flex, Grid, HStack, Heading, Image, SimpleGrid, Stack, Tag, Text, VStack } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react'
import Footer from './Footer';


function Home() {

  const breakpoints = {
    base: '0px',
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1150px',
    '2xl': '1536px'
  }
  const theme = extendTheme({ breakpoints })
  return (
    <>
      <Box bg={"#1a202c"} color={"#fff"}>
        <Flex>
          <Box mt={10} marginLeft={10}>
            <Center><Text mt={5} fontSize={"18px"} textAlign={'center'} fontWeight={"500"} color={"orangered"}>LEARN WITH</Text></Center>
            <Center><Text mt={1} m={'auto'} textAlign={'center'} fontSize={"60px"}>India's trusted education platform</Text></Center>
            <Center>
              <Text color={"#8c7f7b"} mt={5} w={'80%'} textAlign={"start"} >Unlock your career's potential with certified courses from top-tier educators worldwide. Broaden your horizons, gain cutting-edge skills, and propel your career to new heights. With our extensive offerings, you'll find the perfect path to success. Power ahead confidently with us by your side.</Text>
            </Center>
            <center>
              <Button mt={10} p={{ base: "30px", md: "30px 160px" }} bg={"#196ae5"} color={"#fff"}>Explore More</Button>
            </center>
          </Box>
          <Center >
            <Image src='/heroimage.webp' alt='HeroImage' mt={"100px"} width={'1200px'} display={{ base: 'none', 'md': 'inline-block' }} />
          </Center>
        </Flex>
        <Box>
          <Center><Text mt={"100px"} fontSize={"18px"} fontWeight={"500"} color={"orangered"}>In Partnership with</Text></Center>
          <Center><Text mt={1} fontWeight={"800"} fontSize={"60px"}> World's Top University</Text></Center>
          <Center>
            <Grid templateColumns='repeat(3, 1fr)' gap={5} m={5} alignItems={"center"}>
              <Image src='/stanford-business.png' alt='staford' width={"300px"} height={"150px"} transition={"all 1s ease-in-out"} _hover={{ transform: "scale(1.1)" }} />
              <Image src='/texas-austin.png' alt='texas' width={"300px"} height={"150px"} transition={"all 1s ease-in-out"} _hover={{ transform: "scale(1.1)" }} />
              <Image src='/arizona-university.png' alt='arizona' width={"300px"} height={"150px"} transition={"all 1s ease-in-out"} _hover={{ transform: "scale(1.1)" }} />
              <Image src='/great-lakes.png' alt='great-lakes' width={"300px"} height={"150px"} transition={"all 1s ease-in-out"} _hover={{ transform: "scale(1.1)" }} />
              <Image src='/northwestern.png' alt='northwestern' width={"300px"} height={"150px"} transition={"all 1s ease-in-out"} _hover={{ transform: "scale(1.1)" }} />
              <Image src='/mit-idss.png' alt='mit' width={"300px"} height={"150px"} transition={"all 1s ease-in-out"} _hover={{ transform: "scale(1.1)" }} />
            </Grid>
          </Center>
          <Center>
            <Button color={"#196ae5"} p={"35px 40px"}>VIEW MORE UNIVERSITIES</Button>
          </Center>
        </Box>
        <Center>
          <Box width={"80%"} mt={10}>
            <Center><Text mt={5} fontSize={"18px"} fontWeight={"500"} color={"orangered"}>Here are more reasons</Text></Center>
            <Center><Text mt={1} fontWeight={"800"} fontSize={"60px"}> Why choose Edu Connect courses?</Text></Center>
            <Flex mt={8} flexDir={{ base: 'column', md: 'row' }} alignItems={'center'}>
              <Center >
                <Image src='/img1.jpg' alt='img' pl={"100px"} transition={"all 1s ease-in-out"} _hover={{ transform: "scale(1.02)" }} />
              </Center>
              <Box width={"50%"} mt={"75px"}>
                <center>
                  <Text fontWeight={"600"} fontSize={"35px"} mt={6} flexWrap={"wrap"}>Get Personalized Guidance</Text>
                </center>
                <Center>
                  <Text color={"#8c7f7b"} mt={5} textAlign={"center"}>Weekly mentorship sessions with Industry Experts along with <br /> Personalized attention in small groups of 5-15 learners. Gain <br /> hands-on exposure through industry-relevant projects</Text>
                </Center>
                <Center>
                  <Flex gap={10} mt={10}>
                    <Center>
                      <VStack spacing='10px'>
                        <Center>
                          <Image src='/tick.svg' alt='tick' /></Center>
                        <Center>
                          <Text fontWeight={"800"}>2,00,000+</Text></Center>
                        <Center>
                          <Text color={"#847570"} fontWeight={"600"} textAlign={"center"}>Mentorship Sessions <br />Completed</Text></Center>
                      </VStack>
                    </Center>
                    <Center>
                      <VStack>
                        <Center>
                          <Image src='/star.svg' alt='star' /></Center>
                        <Center>
                          <Text fontWeight={"800"}>4.7/5</Text></Center>
                        <Center>
                          <Text color={"#847570"} fontWeight={"600"}>Average Mentor Rating</Text>
                        </Center>
                      </VStack>
                    </Center>
                  </Flex>
                </Center>
                <center>
                  <Button mt={10} p={{ base: "30px", md: "30px 160px" }} bg={"#196ae5"} color={"#fff"}>VIEW EXPERIENCE</Button>
                </center>
              </Box>
            </Flex>
            <Flex mt={8} flexDir={{ base: 'column', md: 'row' }} alignItems={'center'}>
              <Box width={"50%"} mt={"75px"}>
                <center>
                  <Text fontWeight={"600"} fontSize={"35px"} mt={6} flexWrap={"wrap"}>EC Excelerate Dedicated Career Support</Text>
                </center>
                <Center>
                  <Text color={"#8c7f7b"} mt={5} textAlign={"center"}>We offer mock interviews to prep for your dream job. Participate in hackathons and career fairs to stay ahead of others.</Text>
                </Center>
                <Center>
                  <Flex gap={10} mt={10}>
                    <Center>
                      <VStack spacing='10px'>
                        <Center>
                          <Image src='/work.svg' alt='work' /></Center>
                        <Center>
                          <Text fontWeight={"800"}>3300+</Text></Center>
                        <Center>
                          <Text color={"#847570"} fontWeight={"600"} textAlign={"center"}>Hiring Companies</Text></Center>
                      </VStack>
                    </Center>
                  </Flex>
                </Center>
                <center>
                  <Button mt={10} mb={10} p={{ base: "30px", md: "30px 160px" }} bg={"#196ae5"} color={"#fff"}>LEARN MORE</Button>
                </center>
              </Box>
              <Center>
                <Image src='/img2.jpg' alt='img' pl={"100px"} transition={"all 1s ease-in-out"} _hover={{ transform: "scale(1.02)" }} />
              </Center>
            </Flex>
            <Flex mt={8} flexDir={{ base: 'column', md: 'row' }} alignItems={'center'}>
              <Center>
                <Image src='/img3.png' alt='img' pl={"100px"} transition={"all 1s ease-in-out"} _hover={{ transform: "scale(1.02)" }} />
              </Center>
              <Box width={"50%"} mt={"115px"}>
                <center>
                  <Text fontWeight={"600"} fontSize={"35px"} mt={6} flexWrap={"wrap"}>Networking and Program Support</Text>
                </center>
                <Center>
                  <Text color={"#8c7f7b"} mt={5} textAlign={"center"}>Grow your professional network with peer interactions, sessions with industry leaders, and get access to a dedicated program manager to solve your queries.</Text>
                </Center>
                <Center>
                  <Flex gap={10} mt={10}>
                    <Center>
                      <VStack spacing='10px'>
                        <Center>
                          <Image src='/support.svg' alt='support' /></Center>
                        <Center>
                          <Text fontWeight={"800"}>1:1</Text></Center>
                        <Center>
                          <Text color={"#847570"} fontWeight={"600"} textAlign={"center"}>Program support</Text></Center>
                      </VStack>
                    </Center>
                    <Center>
                      <VStack>
                        <Center>
                          <Image src='/star.svg' alt='star' /></Center>
                        <Center>
                          <Text fontWeight={"800"}>4.3/5</Text></Center>
                        <Center>
                          <Text color={"#847570"} fontWeight={"600"}>Average Support Rating</Text>
                        </Center>
                      </VStack>
                    </Center>
                  </Flex>
                </Center>
                <center>
                  <Button mt={10} p={{ base: "30px", md: "30px 160px" }} bg={"#196ae5"} color={"#fff"}>SEE MORE</Button>
                </center>
              </Box>
            </Flex>

          </Box>
        </Center>
        <Center>
          <Box mt={10}>
            <Center><Text mt={5} fontSize={"18px"} fontWeight={"500"} color={"orangered"}>Providing online education for</Text></Center>
            <Center><Text mt={1} fontWeight={"800"} fontSize={"60px"}> Learners across 170+ countries</Text></Center>
            <Image src='/learnersbanner.png' alt='map' mt={8} />
          </Box>
        </Center>
        {/* <Footer/> */}
        {/* <Quiz/> */}
      </Box>
    </>
  )
}

export default Home