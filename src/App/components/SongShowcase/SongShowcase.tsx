import * as React from "react"
import {
  Box,
  Text,
  Flex,
  VStack,
  Spacer,
  Heading,
} from "@chakra-ui/react"

import { ColorPopover } from "../ColorPopover/ColorPopover"
import { CustomPlayer } from "../CustomPlayer/CustomPlayer"

import { supabase } from '../supabaseClient'

export const SongShowcase = ({songId}:{songId: number}) => {
  return (
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
    </Flex>)
}