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
  CloseButton,
  Tooltip,
  Box
} from "@chakra-ui/react"
import { useState } from "react"
import { FiHelpCircle } from 'react-icons/fi'
import { ChromePicker } from 'react-color'
//import { ColorPicker } from './ColorPicker/ColorPicker'

import { supabase } from '../supabaseClient'

export const ColorPopover = (props: any) => {
  const [color, setColor] = useState('#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')); // define a state for the color prop
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
      props.dataUpdater();
    }
  };

  const updateTime = () => {
    setCurrTime(document.getElementById("rhap_current-time")?.innerText);
    console.log(`Time set to ${currTime}`)
  }
  
  return (
    <Popover>
    <Tooltip
      hasArrow
      fontSize="sm"
      textAlign="center"
      label='Do you feel like a specific color fits the music at
        this timestamp? Submit your vote (aka a Syn), and compare how
        many people feel the same way as you!'
      placement='bottom'
    >
    <Box 
      style={{
        display: "flex",
        flexGrow: 1,
        flexShrink: 0,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    <PopoverTrigger>
      <Button
        rightIcon={<FiHelpCircle />}
        onClick={() => updateTime()}
        fontWeight="normal"
        width="100%"
      >
        Syn Here
      </Button>
    </PopoverTrigger>
    </Box>
    </Tooltip>
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
              textAlign="center"
              alignSelf='flex-start'
              position='relative'
              right={-1}
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
