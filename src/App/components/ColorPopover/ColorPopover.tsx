import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  CloseButton,
  Flex,
  Heading,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  ScaleFade,
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import BadWordsFilter from 'bad-words';
import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import { FiHelpCircle } from 'react-icons/fi';

import { supabase } from '../supabaseClient';
import { styles } from './customStyle.js';

export const ColorPopover = (props: any) => {
  const [color, setColor] = useState('#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')); // define a state for the color prop
  const [comment, setComment] = useState('')
  const [name, setName] = useState('')
  const [currTime, setCurrTime] = useState<string | undefined>('');
  const {isOpen: showAlert, onClose: closeAlert, onOpen: openAlert} = useDisclosure({ defaultIsOpen: false })
  const {isOpen: showSuccess, onClose: closeSuccess, onOpen: openSuccess} = useDisclosure({ defaultIsOpen: false })

  var filter = new BadWordsFilter();
  
  // setState when onChange event triggered
  const handleColorChange = (color: any) => {
    console.log(color);
    setColor(color.hex);
  };

  const handleSubmit = async () => {
    if (filter.isProfane(comment)) {
      openAlert();
      return;
    }

    console.log(`Submitting ${color}..`);
    const { error } = await supabase
      .from('hexcodes')
      .upsert({
        user_id: 1,
        song_id: props.songId,
        hex_code: color,
        timestamp: currTime,
        comment: comment,
        username: name})
      .select()
    if (error) {
      console.log("Error")
      openAlert()
      console.log({showAlert})
    } else {
      openSuccess();
      console.log(`${color} successfully submitted.`);
      props.dataUpdater();
    }
  };

  const updateTime = () => {
    setCurrTime(document.getElementById("rhap_current-time")?.innerText);
    console.log(`Time set to ${currTime}`)
  }
  
  const handleCommentChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    let inputValue = e.target.value;
    setComment(inputValue);
  }

  const handleNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    setName(inputValue);
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
      openDelay={500}
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
        Vote Here
      </Button>
    </PopoverTrigger>
    </Box>
    </Tooltip>
    <Portal>
      <PopoverContent w={{base: "80vw", md: "500px"}}>
        <PopoverArrow />
        <PopoverHeader
          alignSelf="center"
        >
          <Heading size='md'>
            NEW SYN
          </Heading>
        </PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          <Flex
            gap={2}
            direction={{
              base: "column", md: "row"
            }}
            alignItems="stretch"
          >
            <Box flexGrow="2" mt="1rem">
            <ChromePicker
              styles={styles}
              color={color}
              onChange={handleColorChange}
              disableAlpha={true}
            />
            </Box>
            {/* <SliderPicker
              styles={styles}
              color={color}
              onChange={handleColorChange}
            /> */}

            {/* FORM INFO */}
            <Flex
              direction={{
                base: "row-reverse", md: "column"
              }}
            >
            <VStack flexGrow="1"
              px="0rem"
              alignItems={{ base: "left" }}>
            <Text>
              I hear...
            </Text>
            <Heading
              color={color}
              textShadow="1px 1px 10px rgba(0,0,0,0.1)"
              size='lg'>
              {color.toUpperCase()}
            </Heading>
            <Text>
              at
            </Text>
            <Heading size='lg'>
              {currTime}
            </Heading>
            </VStack>
            <VStack flexGrow="1"
              px={{ base: "2rem", md: "0rem" }}
              alignItems={{ base: "left" }}>
            <Textarea
              value={comment}
              onChange={handleCommentChange}
              variant='filled'
              _focus={{
                borderColor: color,
                borderRadius: '5px'
              }}
              mt="0.5rem"
              resize="none"
              size='xs'
              placeholder='Type your comment here!' />
            <Input
              value={name}
              onChange={handleNameChange}
              placeholder='Your Name (optional)'
              size='xs'
              variant='filled'
              _focus={{
                borderColor: color,
                borderRadius: '5px'
              }}/>
            {(!showAlert && !showSuccess) && (
              <Button fontWeight="normal" m="1rem 0rem" onClick={handleSubmit}>Submit</Button>
            )}
            </VStack>
            </Flex>
          </Flex>
        </PopoverBody>
        <PopoverFooter alignSelf='center'>
          
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
            <AlertDescription fontSize='sm'>Submission failed. Either our server is down or your comment was naughty!</AlertDescription>
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
            <AlertDescription fontSize='sm'>Submission success!</AlertDescription>
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
