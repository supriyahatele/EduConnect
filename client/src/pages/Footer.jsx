import React from 'react'
import { Box, Button, Center, Container, Flex, Grid, HStack, Heading, Image, SimpleGrid, Stack, Tag, Text, VStack } from '@chakra-ui/react';

function Footer() {
  return (
    <>
      <Box color={"#b3b3b3"} bg={"black"} >
          <Center>
          
          <Image width={"150px"} height={"30px"} src='/logo.png' alt='logo' bg={"#FFF"} mt={4} p={1}/>
          </Center>
          <Container as={Stack} maxW={'full'} py={10} >
            <SimpleGrid columns={{ base: 2, sm: 2, md: 4 }} spacing={8}>
              <Stack align={'flex-start'}>
                <Heading _hover={{ color: "" }}>Product</Heading>
                <Box as="a" href={'#'}>
                  Overview
                </Box>
                <Stack direction={'row'} align={'center'} spacing={2}>
                  <Box as="a" href={'#'}>
                    Features
                  </Box>
                </Stack>
                <Box as="a" href={'#'}>
                  Tutorials
                </Box>
                <Box as="a" href={'#'}>
                  Pricing
                </Box>
                <Box as="a" href={'#'}>
                  Releases
                </Box>
              </Stack>
              <Stack align={'flex-start'}>
                <Heading>Company</Heading>
                <Box as="a" href={'#'}>
                  About Us
                </Box>
                <Box as="a" href={'#'}>
                  Press
                </Box>
                <Box as="a" href={'#'}>
                  Careers
                </Box>
                <Box as="a" href={'#'}>
                  Contact Us
                </Box>
                <Box as="a" href={'#'}>
                  Partners
                </Box>
              </Stack>
              <Stack align={'flex-start'}>
                <Heading>Legal</Heading>
                <Box as="a" href={'#'}>
                  Cookies Policy
                </Box>
                <Box as="a" href={'#'}>
                  Privacy Policy
                </Box>
                <Box as="a" href={'#'}>
                  Terms of Service
                </Box>
                <Box as="a" href={'#'}>
                  Law Enforcement
                </Box>
                <Box as="a" href={'#'}>
                  Status
                </Box>
              </Stack>
              <Stack align={'flex-start'}>
                <Heading>Follow Us</Heading>
                <Box as="a" href={'#'}>
                  Facebook
                </Box>
                <Box as="a" href={'#'}>
                  Twitter
                </Box>
                <Box as="a" href={'#'}>
                  Dribbble
                </Box>
                <Box as="a" href={'#'}>
                  Instagram
                </Box>
                <Box as="a" href={'#'}>
                  LinkedIn
                </Box>
              </Stack>
            </SimpleGrid>
          </Container>
          <Text pt={6} fontSize={'sm'} textAlign={'center'} p={2}>
            © 2022 EDUCONNECT. All rights reserved
          </Text>
        </Box>
    </>
  )
}

export default Footer
