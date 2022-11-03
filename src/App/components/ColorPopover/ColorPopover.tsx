import * as React from "react"
import {
  Grid,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  Button,
  PopoverFooter,
  Portal,
  Heading,
} from "@chakra-ui/react"
import { useState } from "react"
import { ChromePicker } from 'react-color'
//import { ColorPicker } from './ColorPicker/ColorPicker'
import './style.css'

import { supabase } from '../supabaseClient'

export const ColorPopover = (props: any) => {
  const [color, setColor] = useState('#ffffff'); // define a state for the color prop
  
  // setState when onChange event triggered
  const handleColorChange = (color: any) => {
    setColor(color.hex);
  };

  const handleSubmit = async () => {
    console.log({color});
    const { data, error } = await supabase
      .from('hexcodes')
      .upsert({ poster_id: 1, song_id: 1, hex_code: {color}})
      .select()
    if (error) {
      console.log(error);
    }
  };

  return (
    <Popover>
    <PopoverTrigger>
      <Button
        style={{
          display: "flex",
          flexGrow: 1,
          flexShrink: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      
        >
          {props.currTime} Syn Here</Button>
    </PopoverTrigger>
    <Portal>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader
          alignSelf="center"
        ><Heading size='lg'>New Syn</Heading></PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          <Grid
            alignItems="center"
            justifyContent="center"
          >
            <ChromePicker
              color={color}
              onChange={handleColorChange}
              disableAlpha={true}
            />
          </Grid>
        </PopoverBody>
        <PopoverFooter alignSelf='center'>
          <Button onClick={handleSubmit}>Submit</Button>
        </PopoverFooter>
      </PopoverContent>
    </Portal>
  </Popover>
  )
}
