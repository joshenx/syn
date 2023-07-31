import './style.css';
import { useState } from 'react';
import {
  Box,
  Flex,
  HStack,
  Heading,
  VStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  Button,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  SliderMark,
} from '@chakra-ui/react';
import * as Tone from 'tone';
import { Frequency } from 'tone/build/esm/core/type/Units';

const synth = new Tone.Synth().toMaster();
const userSynth = new Tone.Synth().toMaster();
const answerSynth = new Tone.Synth().toMaster();

interface Interval {
  name: string;
  ratio: number;
}

const INTERVALS: { [key: string]: Interval } = {
  '3': { name: 'Minor 3rd', ratio: 6 / 5 },
  '4': { name: 'Major 3rd', ratio: 5 / 4 },
  '7': { name: 'Perfect 5th', ratio: 3 / 2 },
  '10': { name: 'Minor 7th', ratio: 9 / 5 },
  '12': { name: 'Perfect Octave', ratio: 2 },
};

const volume = 0.4;

const getRandomInterval = (object: { [key: string]: Interval }) => {
  var keys = Object.keys(object);
  return keys[Math.floor(keys.length * Math.random())];
};

const defaultUserFreq = Math.round(Math.random() * 200 + 200);

const About = (props: any) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUserPlaying, setIsUserPlaying] = useState(false);
  const [isAnswerPlaying, setIsAnswerPlaying] = useState(false);
  const [currFreq, setCurrFreq] = useState(defaultUserFreq);
  const [userFreq, setUserFreq] = useState(defaultUserFreq);
  const [currInterval, setCurrInterval] = useState(
    getRandomInterval(INTERVALS),
  );

  // Calculate answers
  const answerInterval = INTERVALS[currInterval].name;
  const answerFreq = Math.round(currFreq * INTERVALS[currInterval].ratio);

  // DEBUG: Log answers
  console.log(`Base freq: ${currFreq}, answerFreq: ${answerFreq}`);

  // Handle answer display
  const [displayResult, setDisplayResult] = useState(false);
  const answerDifference = Math.round(answerFreq - userFreq);
  let answerResponse = '';
  if (answerDifference === 0) {
    answerResponse = 'WOW! Your answer was absolutely spot on!!';
  } else if (answerDifference > 0) {
    answerResponse = `Your answer was ${Math.abs(
      answerDifference,
    )} Hz lower than the actual answer.`;
  } else {
    answerResponse = `Your answer was ${Math.abs(
      answerDifference,
    )} Hz higher than the actual answer.`;
  }

  const generateNewQuestion = () => {
    const newFreq = Math.round(Math.random() * 200 + 200);
    const newInterval = getRandomInterval(INTERVALS);
    setCurrFreq(newFreq);
    setUserFreq(newFreq);
    setCurrInterval(newInterval);

    console.log(`New interval: ${newInterval}`);

    synth.triggerRelease();
    setIsPlaying(false);
    userSynth.triggerRelease();
    setIsUserPlaying(false);
    answerSynth.triggerRelease();
    setIsAnswerPlaying(false);
  };

  const handleNextQuestion = () => {
    setDisplayResult(false);
    generateNewQuestion();
  };

  const playUserFreq = (freq: Frequency) => {
    userSynth.triggerAttack(freq, '0', volume);
  };

  const toggleSystemPlaying = () => {
    if (isPlaying) {
      synth.triggerRelease();
      setIsPlaying(false);
    } else {
      synth.triggerAttack(currFreq, '0', volume);
      setIsPlaying(true);
    }
    console.log(`IsPlaying set to: ${isPlaying}`);
  };

  const toggleAnswerPlaying = () => {
    if (isAnswerPlaying) {
      answerSynth.triggerRelease();
      setIsAnswerPlaying(false);
    } else {
      // Disable user synth
      userSynth.triggerRelease();
      setIsUserPlaying(false);

      // Play answer
      answerSynth.triggerAttack(answerFreq, '0', volume);
      setIsAnswerPlaying(true);
    }
    console.log(`IsAnswerPlaying set to: ${isAnswerPlaying}`);
  };

  const toggleUserPlaying = () => {
    if (isUserPlaying) {
      userSynth.triggerRelease();
      setIsUserPlaying(false);
    } else {
      // Disable correct answer synth in result display
      answerSynth.triggerRelease();
      setIsAnswerPlaying(false);

      // Play user input
      playUserFreq(userFreq);
      setIsUserPlaying(true);
    }
    console.log(`IsUserPlaying set to: ${isUserPlaying}`);
  };

  const handleUserFreqChange = (val: number) => {
    setUserFreq(val);
    if (isUserPlaying) {
      userSynth.triggerRelease();
      playUserFreq(userFreq);
    }
    console.log(`User frequency submitted: ${val}`);
  };

  const handleSubmit = () => {
    setDisplayResult(true);
  };

  return (
    <Flex
      gap={2}
      direction="column"
      alignItems="center"
      m="3rem"
      minHeight="60vh"
    >
      <VStack
        spacing="5"
        width={{ base: '100vw', md: '80vw', lg: '40vw' }}
        px={{ base: '2rem', md: '0rem' }}
        alignItems={{ base: 'left' }}
      >
        <Box textAlign="left" width="min(80%, 720px)">
          <Heading>Just Training</Heading>
          <Text lineHeight="2rem" mt="1rem" align="left">
            This little tool is for you to train your just intonation, helping
            you to harmonise with others perfectly!
          </Text>
        </Box>

        <Heading>Your interval: {answerInterval}</Heading>
        <Flex>
          <Box flexGrow="2" mr="1rem">
            <Button
              width="100%"
              fontWeight="normal"
              onClick={toggleSystemPlaying}
            >
              {!isPlaying ? 'Play' : 'Stop'}
            </Button>
          </Box>

          <Box flexGrow="1" mx="1rem" textAlign="center">
            <Button width="100%" fontWeight="normal" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>

          <Box ml="1rem">
            <Button
              width="100%"
              fontWeight="normal"
              onClick={handleNextQuestion}
            >
              {'>'}
            </Button>
          </Box>
        </Flex>

        <HStack>
          <Box width="200px">
            <Text fontSize="sm">Your answer: </Text>
            <Heading fontSize="2xl" noOfLines={1}>
              {userFreq} Hz
            </Heading>
          </Box>

          <Slider
            aria-label="slider-ex-2"
            colorScheme="pink"
            defaultValue={currFreq}
            value={userFreq}
            min={currFreq}
            max={answerFreq + 200}
            onChange={(val) => handleUserFreqChange(val)}
            onChangeEnd={(val) => handleUserFreqChange(val)}
          >
            <SliderMark
              value={currFreq}
              textAlign="center"
              bg="brand.pink"
              color="white"
              mt="-10"
              ml="-5"
              w="16"
              borderRadius="5px"
            >
              {userFreq} Hz
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack bg="brand.pink" />
            </SliderTrack>
            <SliderThumb bg="brand.pink" />
          </Slider>

          <Box flexGrow="2" textAlign="center">
            <Button
              width="100px"
              fontWeight="normal"
              onClick={toggleUserPlaying}
            >
              {!isUserPlaying ? 'Test' : 'Stop Test'}
            </Button>
          </Box>
        </HStack>
        <Divider />

        {displayResult && (
          <Alert
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            borderRadius="15px"
            height="200px"
          >
            {/* <AlertIcon boxSize="40px" mr={0} /> */}
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Keep it up!
            </AlertTitle>
            <AlertDescription maxWidth="md">{answerResponse}</AlertDescription>
            <Button
              width="auto"
              fontWeight="normal"
              m="1rem"
              onClick={toggleAnswerPlaying}
            >
              {!isAnswerPlaying ? 'Play Answer' : 'Stop Answer'}
            </Button>
          </Alert>
        )}
      </VStack>
    </Flex>
  );
};

export default About;
