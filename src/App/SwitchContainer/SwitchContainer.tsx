import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'

import { Box, Heading, Text, Button } from '@chakra-ui/react';

import { SongSection } from '../components/SongSection/SongSection'
import { AboutSection } from '../components/AboutSection/AboutSection' 

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" py={"4rem"} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text">
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={'gray.500'} mb={6}>
        The page you're looking for does not seem to exist
      </Text>

      <Button
        colorScheme="teal"
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        color="white"
        variant="solid"
        onClick={() => navigate('/')}
      >
        Save me!
      </Button>
    </Box>
  );
}

export const SwitchContainer = () => {
  return (
    <Routes>
        <Route path="/" element={<SongSection songId={1}/>} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="*" element={<PageNotFound />} />
    </Routes>
  )

}