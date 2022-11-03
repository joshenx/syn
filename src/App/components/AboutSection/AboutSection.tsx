import * as React from "react"
import {
  Box,
  Grid,
  Text,
  Flex,
  VStack,
  Spacer,
  Heading,
} from "@chakra-ui/react"

export const AboutSection = (props:any) => {
  return (
    <Grid
      flexDirection="column"
      justifyContent="center"
      minH="100vh"
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
        <Flex m="1rem" direction="column" grow="4">
          <Box textAlign="left">
            <Heading>
              About Me
            </Heading>
            <Text
              align='left'
            >
            </Text>
          </Box>
          
        </Flex>
        
      </Flex>
    </Grid>
  )
}