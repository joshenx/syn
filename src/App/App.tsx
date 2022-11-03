import '@fontsource/inter/500.css'

import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Flex,
  VStack,
  Spacer,
  Heading,
  Grid,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import  { NavBar } from "./components/NavBar"
import  { ColorPopover } from "./components/ColorPopover/ColorPopover"
import  { CustomPlayer } from "./components/CustomPlayer/CustomPlayer"
import theme from "./theme"


export const App = () => (

  <ChakraProvider theme={theme}>
    <Box fontSize="md">
      <NavBar />
      <Grid
        justifyContent="center"
        minH="100vh"
        p={3}
      >
        <Flex
          pt="4rem"
          width="60vw"
          height="30vh"
          direction="row"
          justify="center"
          align="stretch"
          wrap="wrap"
        >
          <Flex bg='brand.pink' direction="column" grow="1">
            <Text>Color Profile</Text>
          </Flex>
          <Spacer />
          <Flex direction="column" grow="2">
            <Box textAlign="left">
              <Heading>
                Violin Concerto in D Major
              </Heading>
              <Text
                align='left'
              >
                Pyotr Ilyich Tchaikovsky
              </Text>
            </Box>
            <VStack
              pt="1rem"
              spacing={2}
              align="stretch"
            >
              <CustomPlayer />
              <ColorPopover />
            </VStack>
          </Flex>
          <Spacer />
          <Flex direction="column" bg='brand.blue' grow="2">
            <Box>
              <Text>Vote Data</Text>
            </Box>
          </Flex>
        </Flex>
      </Grid>
    </Box>
  </ChakraProvider>
)
