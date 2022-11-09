import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Collapse,
  Hide
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Link as ReachLink } from 'react-router-dom';

import pagesData from '../../pages/pagesData';
import { routerType } from '../../types/router.types';

export const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const NavLink = ({ children, link }: { children: ReactNode, link: string }) => (
    <Link
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      as={ReachLink}
      to={`/${link}`}
      onClick={onClose}>
      {children}
    </Link>
  );
  
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box pl="1rem" fontWeight="bold">Syn</Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {pagesData.filter(({ path }: routerType) => path !== '*')
                .map(({ path, title }: routerType, index) => (
                <NavLink key={index} link={path}>{title}</NavLink>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Average Music Enjoyer</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  {/* <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem> */}
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>

        <Hide above='md'>
        <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
          <Stack
            my={3}
            pl={4}
            borderLeft={1}
            borderStyle={'solid'}
            fontSize="2xl"
            textTransform="uppercase"
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            align={'start'}>
            {pagesData.filter(({ path }: routerType) => path !== '*')
                  .map(({ path, title }: routerType, index) => (
                  <NavLink key={index} link={path}>{title}</NavLink>
                ))}
          </Stack>
        </Collapse>
        </Hide>
      </Box>

      
    </>
  );
}