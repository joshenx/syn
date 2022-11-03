import * as React from "react"
import {
  Grid,
  ScaleFade,
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
  Alert,
  AlertIcon,
  AlertDescription,
  useDisclosure,
  CloseButton
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { ChromePicker } from 'react-color'
//import { ColorPicker } from './ColorPicker/ColorPicker'
import './style.css'

import { supabase } from '../supabaseClient'

export const ColorPopover = (props: any) => {
  const [color, setColor] = useState('#ffffff'); // define a state for the color prop
  const [currTime, setCurrTime] = useState<string | undefined>('');
  const {isOpen: showAlert, onClose: closeAlert, onOpen: openAlert} = useDisclosure({ defaultIsOpen: false })
  const {isOpen: showSuccess, onClose: closeSuccess, onOpen: openSuccess} = useDisclosure({ defaultIsOpen: false })

  // setState when onChange event triggered
  const handleColorChange = (color: any) => {
    setColor(color.hex);
  };

  const handleSubmit = async () => {
    console.log({color});
    const { data, error } = await supabase
      .from('hexcodes')
      .upsert({
        user_id: 1,
        song_id: props.songId,
        hex_code: color,
        timestamp: currTime})
      .select()
    if (error) {
      console.log("Error")
      openAlert()
      console.log({showAlert})
    } else {
      openSuccess();
    }
  };

  const updateTime = () => {
    setCurrTime(document.getElementById("rhap_current-time")?.innerText);
    console.log(`Time set to ${currTime}`)
  }
  
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
        onClick={() => updateTime()}
      >
        Syn Here
      </Button>
    </PopoverTrigger>
    <Portal>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader
          alignSelf="center"
        >
          <Heading size='lg'>
            Syn @ {currTime}
          </Heading>
          {/* refresh button */}
        </PopoverHeader>
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
          {(!showAlert && !showSuccess) && (
            <Button m="0rem 1rem" onClick={handleSubmit}>Submit</Button>
          )}
          {showAlert && (
            <ScaleFade
              initialScale={0.9}
              in={showAlert}
            >
            <Alert
              borderRadius="10px"
              status='error'
              variant='solid'
            >
            <AlertIcon />
            <AlertDescription>Submission failed</AlertDescription>
            <CloseButton
              alignSelf='flex-start'
              position='relative'
              right={-1}
              top={-1}
              onClick={closeAlert}
            />
            </Alert>
            </ScaleFade>
          )}
          {showSuccess && (
            <ScaleFade
              initialScale={0.9}
              in={showSuccess}  
            >
            <Alert
              borderRadius="10px"
              status='success'
              variant='solid'
            >
            <AlertIcon />
            <AlertDescription>Submission success!</AlertDescription>
            <CloseButton
              alignSelf='flex-start'
              position='relative'
              right={-1}
              top={-1}
              onClick={closeSuccess}
            />
            </Alert>
            </ScaleFade>
          )}
        </PopoverFooter>
      </PopoverContent>
    </Portal>
  </Popover>
  )
}
