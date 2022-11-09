import { Box, Button, HStack } from '@chakra-ui/react';
import { useState } from 'react';

import { SongSection } from '../../App/components/SongSection/SongSection';

const Gallery = () => {
  const DEFAULT_INDEX = 3;
  const [song, setSong] = useState(DEFAULT_INDEX);

  const handleSongChange = (e:any) => {
    console.log(`Setting song to id: ${e.target.value}`)
    setSong(e.target.value);
  }

  return (
    <Box>
      <HStack justifyContent={'center'} m="1rem" spacing={4}>
        {['1', '2', '3'].map((songId) => (
          <Button
            size={'sm'}
            key={songId}
            value={songId}
            borderRadius='full'
            variant='solid'
            bgColor="brand.green"
            onClick={handleSongChange}
          >
            {songId}
            {/*<TagCloseButton />*/}
          </Button>
        ))}
      </HStack>
      <SongSection songId={song} />
    </Box>
  );
};

export default Gallery;