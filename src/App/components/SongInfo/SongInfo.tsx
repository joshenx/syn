import * as React from "react"
import {
  Box,
  Text,
  Flex,
  Heading,
} from "@chakra-ui/react"

export const SongInfo = (props:any) => {
  return (
    <Flex
      mt="2rem"
      wrap="wrap"
      p="0 20%"
    >
      <Flex direction="column">
        <Box textAlign="left">
          <Heading
            pb="2rem"
          >
            Description
          </Heading>
          <Text
            align='left'
            whiteSpace="pre-line"
          >
            {props.songData?.description}
          </Text>
        </Box>
      </Flex>
    </Flex>)
}