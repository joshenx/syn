import { supabase } from "../../App/components/supabaseClient"
import { useState } from "react"
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  CloseButton,
  Divider,
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

const Feedback = () => {
  const [feedback, setFeedback] = useState('')
  const [name, setName] = useState('')
  const {isOpen: showAlert, onClose: closeAlert, onOpen: openAlert} = useDisclosure({ defaultIsOpen: false })
  const {isOpen: showSuccess, onClose: closeSuccess, onOpen: openSuccess} = useDisclosure({ defaultIsOpen: false })

  var filter = new BadWordsFilter();

  const handleSubmit = async () => {

    console.log(`Submitting feedback..`);
    const { error } = await supabase
      .from('feedback')
      .upsert({
        name: name,
        feedback: filter.clean(feedback),})
      .select()
    if (error) {
      console.log("Error")
      openAlert()
    } else {
      openSuccess();
    }
  };

  const handleFeedbackChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    let inputValue = e.target.value;
    setFeedback(inputValue);
  }

  const handleNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    setName(inputValue);
  }

  return (
    <Flex
      gap={2}
      direction='column'
      alignItems="center"
      justifyContent='center'
      m='3rem'
      minHeight='50vh'
    >
      
      <VStack
        spacing="5"
        width={{base:'100vw', md:'40vw'}}
        px={{ base: "2rem", md: "0rem" }}
        alignItems={{ base: "left" }}>
      <Heading>Give me some feedback!</Heading>
      <Text fontSize='md' fontStyle='normal'>
        Whether you have an idea for a new feature, or you hate one of the songs 
        in the gallery, or something's broken, let me know!
      </Text>
      <Divider my='1rem'/>
      <Textarea
        value={feedback}
        onChange={handleFeedbackChange}
        variant='filled'
        height='10rem'
        mt="0.5rem"
        resize="none"
        size='md'
        placeholder='Type your feedback here' />
      <Input
        value={name}
        onChange={handleNameChange}
        placeholder='Your Name (optional)'
        size='md'
        variant='filled'
        />
      {(!showAlert && !showSuccess) && (
        <Button fontWeight="normal" m="1rem 0rem" onClick={handleSubmit}>Submit</Button>
      )}
      </VStack>
      {showAlert && (
      <ScaleFade
        initialScale={0.9}
        in={showAlert}
      >
      <Alert
        mt='1rem'
        borderRadius="10px"
        status='error'
        variant='solid'
      >
      <AlertIcon />
      <AlertDescription fontSize='sm'>Submission failed.</AlertDescription>
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
        mt='1rem'
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
    </Flex>
  )
}

export default Feedback