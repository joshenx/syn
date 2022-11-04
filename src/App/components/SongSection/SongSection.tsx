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
import { SongGradientGenerator } from "../SongGradientGenerator/SongGradientGenerator"
import { VoteDataDisplay } from "../VoteDataDisplay/VoteDataDisplay"
import { SongInfo } from "../SongInfo/SongInfo"

import { useEffect, useState } from "react"
import { supabase } from '../supabaseClient'

export const SongSection = ({songId}: {songId:number}) => {
  interface SongData {
    title: string;
    composer: string;
    description: string;
    url: string;
  }
  
  const [data, setData] = useState<any[] | null>(null);
  const [song, setSong] = useState<SongData | null>(null);
  
  
  const fetchColorsData = async () => {
    let { data, error, status } = await supabase
      .rpc('collect_votes_of', {
        songid: songId
      })

    if (error && status !== 406) {
      console.error(error)
    }

    console.log("JSON FORMATTTED DATA:" + JSON.stringify(data))
    setData(data);
  }

  useEffect(() => {
    const fetchSong = async () => {
      let { data, error, status } = await supabase
        .from('songs')
        .select('*')
        .eq('song_id', songId)
        .single();

      if (error && status !== 406) {
        console.error(error)
      }

      console.log(data)
      setSong(data);
    }

    fetchSong();

    fetchColorsData();
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
        paddingX="5vw"
        direction="row"
        justify="center"
        align="stretch"
        wrap="wrap"
      >
        <Flex m="1rem" direction="column" grow="2">
          <SongGradientGenerator data={data} />
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
            <ColorPopover dataUpdater={fetchColorsData} songId={songId} />
          </VStack>
        </Flex>
        <Spacer />
        <Flex m="1rem" direction="column" grow="2">
          <Box>
            <VoteDataDisplay data={data} />
          </Box>
        </Flex>
        <SongInfo songData={song}/>
      </Flex>
    </Grid>
  )
}