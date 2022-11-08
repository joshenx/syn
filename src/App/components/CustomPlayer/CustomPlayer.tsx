import './style.css';
import 'react-h5-audio-player/lib/styles.css';

import { TriangleDownIcon } from '@chakra-ui/icons';
import { Box, Tooltip, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';

import { timestampToPercentage } from './helperFunctions';

export const CustomPlayer = (
  {data, src}: {data:any[] | null, src:string | undefined},) => {
  const [duration, setDuration] = useState<string | undefined>(undefined)
  const [markers, setMarkers] = useState<any[]|undefined>(undefined)
  const maxTries = 30;
  var t = 500;

  function rejectDelay(reason:any) {
    return new Promise(function(resolve, reject) {
      setTimeout(reject.bind(null, reason), t); 
    });
  }
  
  function attempt() {
    let totalTimes = document
      .getElementsByClassName("rhap_total-time")[0].innerHTML;
    if(totalTimes === '--:--') {
      throw totalTimes;
    } else {
      return totalTimes;
    }
  }

  function processResult(res:any) {
    console.log(`Duration found: ${res}`);
    setDuration(res);
  }

  function initMarkers() {
    console.log(`Initialising markers..`)
    const newMarkers = data?.map((row, id) => {
      return (
      <Tooltip
        arrowSize={2}
        hasArrow
        placement='top-start'
        key={id}
        label={row.comment}
        fontSize='sm'>
        <TriangleDownIcon
          color={row.hex_code}
          position="absolute"
          left={timestampToPercentage(row.timestamp, duration)}
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

  function errorHandler(err:any) {
    console.error(`Could not find: ${err}`);
  }

  useEffect(() => {
    var p = new Promise(() => attempt())
    for(var i=0; i<maxTries; i++) {
      p = p.catch(attempt).catch(rejectDelay);
    }
    p = p.then(processResult).catch(errorHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    if (duration && duration !== "--:--") {initMarkers();}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, data])

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
