import './style.css';

import { Box, ButtonGroup, Flex, Grid, Heading, IconButton, Image, Text } from '@chakra-ui/react';
import { FaBehance, FaGithub, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const About = (props:any) => {
  return (
    <Grid
      flexDirection="column"
      justifyContent="center"
      minH="90vh"
      overflow="hidden"
      p={3}
    >
      <Flex
        pt="2rem"
        paddingX="10vw"
        direction="row"
        justify="center"
        align="stretch"
        wrap="wrap"
      >
        <Image
          className='easeload'
          src='/images/AntelopeCanyon.png'
          alt='Joshen Lim'
          objectFit='cover'
          boxSize={{ base: '250px', md: '600px'}}
          filter='opacity(0.4) contrast(150%)'
          objectPosition='bottom'
          position='absolute'
          right='10%'
          zIndex={-1}/>
        <Flex m="1rem" direction="column">
          <Box textAlign="left" width="min(80%, 720px)">
            <Heading>
              About Me
            </Heading>
            <Text
              lineHeight="2rem"
              mt='1rem'
              align='left'
            >
              Hi, I'm Joshen. I'm a musician of {new Date().getFullYear()-2010} years, a graphic
              designer, and currently a Computer Science student at the National University of Singapore.
              I made this website to practise full-stack web development,
              and to simultaneously share my passion in music with others.
              <br></br><br></br>
              This is my first ever web development project, so I appreciate your time
              to give feedback or even contribute to the source code. If you are here to
              interact with the gallery, have fun and really spend the time to reflect on
              what you hear in the music!
            </Text>
            <ButtonGroup mt='2rem' spacing={5} variant="ghost">
            <IconButton
              as="a"
              href="https://www.youtube.com/channel/UCtNvViFMEl06md4ouf1YTRw"
              aria-label="Youtube"
              target="_blank"
              icon={<FaYoutube fontSize="2rem" />}
            />
            <IconButton
              as="a"
              href="http://linkedin.com/in/joshenxlim"
              aria-label="LinkedIn"
              target="_blank"
              icon={<FaLinkedin fontSize="2rem" />}
            />
            <IconButton
              as="a"
              href="http://behance.net/joshenlim"
              aria-label="Behance"
              target="_blank"
              icon={<FaBehance fontSize="2rem" />}
            />
            <IconButton
              as="a"
              href="http://github.com/joshenx"
              aria-label="GitHub"
              target="_blank"
              icon={<FaGithub fontSize="2rem" />}
            />
            <IconButton
              as="a"
              href="http://instagram.com/joshenz"
              aria-label="Instagram"
              target="_blank"
              icon={<FaInstagram fontSize="2rem" />}
            />
          </ButtonGroup>
          </Box>
        </Flex>
      </Flex>
    </Grid>
  )
}

export default About