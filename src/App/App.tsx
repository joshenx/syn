import '@fontsource/inter/500.css'

import * as React from "react"
import {
  ChakraProvider,
  Box,
  Grid,
} from "@chakra-ui/react"
import { NavBar } from "./components/NavBar"
import { SongShowcase } from "./components/SongShowcase/SongShowcase"
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
        <SongShowcase songId={1} />
        
      </Grid>
    </Box>
  </ChakraProvider>
)
