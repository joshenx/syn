import {
  Box,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import {
  FaBehance,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from 'react-icons/fa';

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

const Footer = () => {
  return (
    <Box>
      <Divider />
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box fontSize={'5xl'} fontWeight="bold">
              Syn
            </Box>
            <Text fontSize={'sm'}>
              © {new Date().getFullYear()} Joshen Lim. All rights reserved.
            </Text>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Home</ListHeader>
            <Link href={'/'}>Gallery</Link>
            <Text color="disabled">Metronome (Coming Soon!)</Text>
            <Link href={'/about'}>About Me</Link>
            <Link href={'/just'}>Just Training</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Contribute</ListHeader>
            <Link href={'/feedback'}>Feedback</Link>
            <Link href={'https://github.com/joshenx/syn'} target="_blank">
              GitHub
            </Link>
          </Stack>
          <ButtonGroup variant="ghost">
            <IconButton
              as="a"
              href="https://www.youtube.com/channel/UCtNvViFMEl06md4ouf1YTRw"
              aria-label="Youtube"
              target="_blank"
              icon={<FaYoutube fontSize="1.25rem" />}
            />
            <IconButton
              as="a"
              href="http://linkedin.com/in/joshenxlim"
              aria-label="LinkedIn"
              target="_blank"
              icon={<FaLinkedin fontSize="1.25rem" />}
            />
            <IconButton
              as="a"
              href="http://behance.net/joshenlim"
              aria-label="Behance"
              target="_blank"
              icon={<FaBehance fontSize="1.25rem" />}
            />
            <IconButton
              as="a"
              href="http://github.com/joshenx"
              aria-label="GitHub"
              target="_blank"
              icon={<FaGithub fontSize="1.25rem" />}
            />
            <IconButton
              as="a"
              href="http://instagram.com/joshenz"
              aria-label="Instagram"
              target="_blank"
              icon={<FaInstagram fontSize="1.25rem" />}
            />
          </ButtonGroup>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Footer;
