import * as React from "react"
import {
  Box,
  Text,
  Flex,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from "@chakra-ui/react"
import { ScorePDFViewer } from '../ScorePDFViewer/ScorePDFViewer'
import { SongData } from "../SongSection/SongSection"

export const SongInfo = ({songData}:{songData:SongData | null}) => {
  return (
    <Flex
      mt="2rem"
      wrap="wrap"
      p={{
        lg: "0 20%",
        md: "0% 0%",
      }}
      minWidth="100%"
      minHeight="80vh"
      alignItems="start"
    >
        <Box textAlign="left" width="100%">
        <Tabs variant='soft-rounded'>
          <TabList>
            <Tab _selected={{
              color: "brand.green",
            }}>
            <Heading
              size="md"
              fontWeight="semibold"
            >
              Description
            </Heading>
            </Tab>
            <Tab _selected={{
              color: "brand.green",
            }}>
            <Heading
              size="md"
              fontWeight="semibold"
            >
              Analysis
            </Heading>
            </Tab>
            <Tab _selected={{
              color: "brand.green",
            }}>
            <Heading
              size="md"
              fontWeight="semibold"
            >
              Score
            </Heading>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Text
                textAlign="justify"
                align='left'
                whiteSpace="pre-line"
                lineHeight="2rem"
              >
                {songData?.description}
              </Text>
            </TabPanel>
            <TabPanel>
              <Text
                textAlign="justify"
                align='left'
                whiteSpace="pre-line"
                lineHeight="2rem"
              >
                {songData?.analysis}
              </Text>
            </TabPanel>
            <TabPanel>
              {songData?.has_score
                ? <ScorePDFViewer songId={songData?.song_id}/>
                : <Box width="100%"/>}
            </TabPanel>
          </TabPanels>
        </Tabs>
        </Box>
    </Flex>
  )
}