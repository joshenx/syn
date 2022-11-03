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

import { ColorPopover } from "../ColorPopover/ColorPopover"
import { CustomPlayer } from "../CustomPlayer/CustomPlayer"
import { VoteDataDisplay } from "../VoteDataDisplay/VoteDataDisplay"
import { SongInfo } from "../SongInfo/SongInfo"

import { useEffect, useState } from "react"
import { supabase } from '../supabaseClient'

export const SongSection = (props:any) => {
  interface SongData {
    title: string;
    composer: string;
    description: string;
    url: string;
  }
  
  const [song, setSong] = useState<SongData | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      let { data, error, status } = await supabase
        .from('songs')
        .select('*')
        .eq('song_id', props.songId)
        .single();

      if (error && status !== 406) {
        console.log(error)
      }

      console.log(data)
      setSong(data);
    }

    fetchData();
  }, [])
  
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
        <Flex m="1rem" bg='brand.pink' direction="column" grow="2">
          
        </Flex>
        <Spacer />
        <Flex m="1rem" direction="column" grow="4">
          <Box textAlign="left">
            <Heading>
              {song?.title}
            </Heading>
            <Text
              align='left'
            >
              {song?.composer}
            </Text>
          </Box>
          <VStack
            pt="1rem"
            spacing={2}
            align="stretch"
          >
            <CustomPlayer src={song?.url} />
            <ColorPopover songId={props.songId} />
          </VStack>
        </Flex>
        <Spacer />
        <Flex m="1rem" direction="column" grow="2">
          <Box>
            <VoteDataDisplay />
          </Box>
        </Flex>
        <SongInfo songData={song}/>
      </Flex>
    </Grid>
  )
}