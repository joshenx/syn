import 'react-h5-audio-player/lib/styles.css';
import './style.css';

import { TriangleDownIcon } from '@chakra-ui/icons';
import { Box, Tooltip, VStack, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { createRef } from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';

import { timestampToPercentage } from './helperFunctions';
import H5AudioPlayer from 'react-h5-audio-player';

export const CustomPlayer = (
  {data, src, refreshStatus, refreshCallback}:
  {data:any[] | null, src:string | undefined, refreshStatus:boolean, refreshCallback:Function}) => {
  const [duration, setDuration] = useState<number | undefined>(undefined)
  const [markers, setMarkers] = useState<any[]|undefined>(undefined)
  const player = createRef<H5AudioPlayer>();

  function initMarkers() {
    console.log(`Initialising markers..`)
    const newMarkers = data?.map((row, id) => {
      return (
      <Tooltip
        backgroundColor={row.hex_code}
        textShadow={`1px 1px 3px rgba(0, 0, 0, 0.8)`}
        arrowSize={2}
        hasArrow
        placement='top-start'
        key={id}
        label={row.username
          ? <Stack spacing='0'>
              <Text >{row.comment}</Text>
              <Text fontSize='xx-small'>-{row.username}</Text>
            </Stack>
          : row.comment}
        fontSize='sm'>
        <TriangleDownIcon
          color={row.hex_code}
          position="absolute"
          left={timestampToPercentage(row.timestamp, duration!)}
          sx={{
            ":hover": {
              transform: "scale(2)",
              zIndex: "2",
              filter: `drop-shadow(0px 0px 3px ${row.hex_code})`
            },
            transition: "all cubic-bezier(.02,.62,.26,1) 0.5s"
          }}
          />
      </Tooltip>
    )});
    setMarkers(newMarkers);
    console.log(`New markers set.`);
  }

  const getDuration = () => {
    const playerDuration = player.current?.audio.current?.duration;
    console.log(`DURATION: ${playerDuration}`);
  
    if (playerDuration) {
      setDuration(playerDuration);
    }
  }

  useEffect(() => {
    initMarkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration])

  useEffect(() => {
    if (refreshStatus) {
      initMarkers();
      refreshCallback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <VStack
      position='relative'
      alignItems='left'
    >
      <Box
        position='relative'
        height="10px"
        width="98%"
        >
        {markers?.map((component) => {return component})}
      </Box>
      
      <AudioPlayer
        onLoadedMetaData={getDuration}
        ref={player}
        autoPlayAfterSrcChange={false}
        autoPlay={false}
        style={{
          width: '100%'
        }}
        src={src}
        customProgressBarSection={
          [
            RHAP_UI.PROGRESS_BAR,
          ]
        }
        customControlsSection={
          [
            RHAP_UI.ADDITIONAL_CONTROLS,
            RHAP_UI.MAIN_CONTROLS,
            RHAP_UI.VOLUME_CONTROLS,
          ]
        }
        customAdditionalControls={[
          RHAP_UI.CURRENT_TIME,
          <div>&nbsp;/&nbsp;</div>,
          RHAP_UI.DURATION,]}
      />
    </VStack>
  );
}
