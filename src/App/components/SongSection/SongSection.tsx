/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Flex, Grid, Heading, Skeleton, Spacer, Stack, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { ColorPopover } from '../ColorPopover/ColorPopover';
import { CustomPlayer } from '../CustomPlayer/CustomPlayer';
import { SongGradientGenerator } from '../SongGradientGenerator/SongGradientGenerator';
import { SongInfo } from '../SongInfo/SongInfo';
import { supabase } from '../supabaseClient';
import { VoteDataDisplay } from '../VoteDataDisplay/VoteDataDisplay';

export interface SongData {
  song_id: number;
  title: string;
  composer: string;
  description: string;
  analysis: string;
  genre: string;
  has_score: boolean;
  url: string;
}

export const SongSection = ({songId}: {songId:number}) => { 
  
  const [colorData, setColorData] = useState<any[] | null>(null);
  const [hexData, setHexData] = useState<any[] | null>(null);
  const [song, setSong] = useState<SongData | null>(null);
  
  const fetchColorsData = async () => {
    let { data, error, status } = await supabase
      .rpc('collect_votes_of', {
        songid: songId
      })

    if (error && status !== 406) {
      console.error(error)
    }
    setColorData(data);
  }

  const fetchHexData = async () => {
    let { data, error, status } = await supabase
      .from('hexcodes')
      .select('*')
      .eq('song_id', songId)

    if (error && status !== 406) {
      console.error(error)
    }

    console.log(`Hexcodes found with ID ${songId}`)
    setHexData(data);
  }
  
  const fetchSong = async () => {
    let { data, error, status } = await supabase
      .from('songs')
      .select('*')
      .eq('song_id', songId)
      .single();

    if (error && status !== 406) {
      console.error(error)
    }

    console.log(`Song found with ID ${songId}`)
    setSong(data);
  }

  const refreshData = () => {
    fetchColorsData();
    fetchHexData();
  }

  useEffect(() => {
    fetchSong();
    fetchColorsData();
    fetchHexData();
  }, [songId])
  
  return (
    <Grid
      flexDirection="column"
      justifyContent="center"
      minH="100vh"
      overflow="hidden"
      px={3}
    >
      <Flex
        paddingX="5vw"
        direction={{ base:"column", lg:"row" }}
        justify="center"
        align="stretch"
        wrap="wrap"
      >
        <Flex m="1rem" direction="column" grow="0" >
          <SongGradientGenerator data={colorData} />
        </Flex>
        <Spacer />
        <Flex m="1rem" direction="column" grow="3" width={{ base:"auto", lg: "600px" }}>
          <Box textAlign="left">
            {song === null && 
            <Stack>
              <Skeleton height='40px' isLoaded={song !== null} />
              <Skeleton height='20px' isLoaded={song !== null} />
              <Skeleton height='20px' isLoaded={song !== null} />
            </Stack>
            }
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
            <CustomPlayer data={hexData} src={song?.url} />
            <ColorPopover dataUpdater={refreshData} songId={songId} />
          </VStack>
        </Flex>
        <Spacer />
        <Flex m="1rem" direction="column" grow="1">
          <VoteDataDisplay data={colorData} />
        </Flex>
        <SongInfo songData={song}/>
      </Flex>
    </Grid>
  )
}
