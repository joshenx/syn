import '@fontsource/inter/500.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/300.css'

import * as React from "react"
import {
  ChakraProvider,
  Box,
  Grid,
} from "@chakra-ui/react"
import { NavBar } from "./components/NavBar"
import { SwitchContainer } from "./SwitchContainer/SwitchContainer"
import { SongSection } from "./components/SongSection/SongSection"
import theme from "./theme"
import { BrowserRouter } from 'react-router-dom'


export const App = () => (

  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Box fontSize="md">
        <NavBar />
        <SwitchContainer />
      </Box>
    </BrowserRouter>
  </ChakraProvider>
)
