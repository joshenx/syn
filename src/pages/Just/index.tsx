import './style.css';

import {
  Box,
  ButtonGroup,
  Flex,
  Grid,
  Heading,
  VStack,
  IconButton,
  Image,
  Link,
  Text,
} from '@chakra-ui/react';

const About = (props: any) => {
  return (
    <Flex
      gap={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      m="3rem"
      minHeight="50vh"
    >
      <VStack
        spacing="5"
        width={{ base: '100vw', md: '40vw' }}
        px={{ base: '2rem', md: '0rem' }}
        alignItems={{ base: 'left' }}
      >
        <Box textAlign="left" width="min(80%, 720px)">
          <Heading>Just Training</Heading>
          <Text lineHeight="2rem" mt="1rem" align="left">
            This little tool is for you to train your just intonation, helping
            you to harmonise with others perfectly!
          </Text>
        </Box>
      </VStack>
    </Flex>
  );
};

export default About;
