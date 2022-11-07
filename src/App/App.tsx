import '@fontsource/inter/500.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/300.css'

import {
  ChakraProvider,
  Box,
} from "@chakra-ui/react"
import { NavBar } from "./components/NavBar"
import Router from "../pages/router"
import theme from "./theme"
import { BrowserRouter } from 'react-router-dom'


export const App = () => (

  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Box fontSize="md">
        <NavBar />
        <Router />
      </Box>
    </BrowserRouter>
  </ChakraProvider>
)
