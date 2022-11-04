import MeshGradient from 'mesh-gradient.js'
import { useEffect, useState } from 'react'
import { Stack, Button, Box, Tooltip, AbsoluteCenter } from '@chakra-ui/react'
import { IconContext } from 'react-icons'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import { IoMdRefresh } from 'react-icons/io'
import './style.css'

const DEFAULT_COLORS = ["#000000", "#222222", "#444444"]

const canvasId = "my-canvas"

export const SongGradientGenerator = ({data}: {data:any[] | null}) => {
  const [colors, setColors] = useState<any[] | undefined>(DEFAULT_COLORS);
  const [gradient] = useState(new MeshGradient());
  
  // const getColors = (data:any[] | null) => {
  //   return new Promise<any[] | undefined>((resolve) => {
  //     resolve(data?.slice(0, 4).map((row) => row.hex_code));
  //   })
  // }

  const initGradient = () => {
    const colorsFromData = data?.slice(0, 4).map((row) => row.hex_code);
    setColors(colorsFromData);

    gradient?.initGradient("#" + canvasId, colors);
    //gradient?.changePosition(780);
    gradient?.changePosition(Math.floor(Math.random() * 1000));
  }

  const refreshGradient = () => {
    gradient?.changePosition(Math.floor(Math.random() * 1000));
  }

  useEffect(() => {
    if (data) {
      console.log("Data found:" + JSON.stringify(data));
      initGradient();
    } else {
      console.log("Looking for data...");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])


  return (
    <Stack
      p="1rem"
      direction="column"
      overflow="hidden"
      align="center"
    >
      <Box position="relative">
        <Tooltip
          hasArrow
          label='This gradient was generated with the top 4 hexcodes!'
          maxWidth="150px"
          placement="top"
          fontSize='xs'
        >
          <IconContext.Provider
            value={{
              style: {
                position: "absolute",
                margin: "1rem",
                left: 1,
                color: "white",
                cursor: "pointer"
              }
            }}
          >
            <IoMdRefresh onClick={refreshGradient} />
          </IconContext.Provider>
        </Tooltip>
        <Tooltip
          hasArrow
          label='This gradient was generated with the top 4 hexcodes!'
          maxWidth="150px"
          placement="top"
          fontSize='xs'
        >
          <InfoOutlineIcon cursor="help" position="absolute" m="1rem" right={0} color="white"/>
        </Tooltip>
        <canvas id={canvasId} />
      </Box>
    </Stack>
  );
}

export default SongGradientGenerator; 
