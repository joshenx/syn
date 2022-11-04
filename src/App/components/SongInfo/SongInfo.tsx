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

export const SongInfo = (props:any) => {
  return (
    <Flex
      mt="2rem"
      wrap="wrap"
      p="0 20%"
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
                align='left'
                whiteSpace="pre-line"
              >
                {props.songData?.description}
              </Text>
            </TabPanel>
            <TabPanel>
            <Text
                align='left'
                whiteSpace="pre-line"
              >
                Wat
              </Text>
            </TabPanel>
            <TabPanel>
            <Text
                align='left'
                whiteSpace="pre-line"
              >
                Score
              </Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
        </Box>
    </Flex>
  )
}