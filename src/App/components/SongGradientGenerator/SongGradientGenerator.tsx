import MeshGradient from 'mesh-gradient.js'
import { useEffect, useState } from 'react'
import { Stack, Button } from '@chakra-ui/react'
import { useScript } from '../../hooks/useScript'
import './style.css'

const DEFAULT_COLORS = ["#000000", "#222222", "#444444"]

const gradient = new MeshGradient();
const canvasId = "my-canvas"

export const SongGradientGenerator = ({data}: {data:any[] | null}) => {
  const [colors, setColors] = useState<any[] | undefined>(DEFAULT_COLORS);

  const initGradient = () => {
    const colorsFromData = data ? data?.slice(0, 4).map((row) => row.hex_code) : DEFAULT_COLORS;

    if (colorsFromData && colorsFromData?.length <= 1) {}
    else {
      setColors(colorsFromData);
      gradient.initGradient("#" + canvasId, colors);
      //gradient?.changePosition(780);
      gradient?.changePosition(Math.floor(Math.random() * 1000));
    }
  }

  useScript('./canvasStyle.js');
  
  useEffect(() => {
    initGradient();
  }, [])


  return (
    <Stack
      p="1rem"
      direction="column"
      overflow="hidden"
      align="center"
    >
      <canvas id={canvasId}/>
      <Button
        my="1.5rem"
        onClick={initGradient}
        fontWeight="normal"
        fontSize="md"
        width="80%"
      > Refresh </Button>
    </Stack>
  );
}

export default SongGradientGenerator; 
