import React from 'react'
import {Box, Button, Center, Grid, Image, Text} from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react'

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
      <Box>
        <Center><Text mt={5} fontSize={"18px"} fontWeight={"500"} color={"orangered"}>In Partnership with</Text></Center>
        <Center><Text mt={1} fontWeight={"800"} fontSize={"40px"}> World's Top University</Text></Center>
        <Center>
        <Grid templateColumns='repeat(3, 1fr)' gap={5} m={5} alignItems={"center"}>
          <Image src='/stanford-business.png' alt='staford' width={"300px"} height={"150px"}/>
          <Image src='/texas-austin.png' alt='texas' width={"300px"} height={"150px"}/>
          <Image src='/arizona-university.png' alt='arizona' width={"300px"} height={"150px"}/>
          <Image src='/great-lakes.png' alt='great-lakes' width={"300px"} height={"150px"}/>
          <Image src='/northwestern.png' alt='northwestern' width={"300px"} height={"150px"}/>
          <Image src='/mit-idss.png' alt='mit' width={"300px"} height={"150px"}/>
        </Grid>
        </Center>
        <Center>
          <Button color={"#196ae5"} p={"35px 40px"}>VIEW MORE UNIVERSITIES</Button>
        </Center>
      </Box>
      <Box mt={5}>
      <Center><Text mt={5} fontSize={"18px"} fontWeight={"500"} color={"orangered"}>Here are more reasons</Text></Center>
        <Center><Text mt={1} fontWeight={"800"} fontSize={"40px"}> Why choose Great Learning courses?</Text></Center>
      </Box>
    </>
  )
}

export default Home
