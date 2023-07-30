import { Button, ButtonGroup, Flex, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { SongSection } from '../../App/components/SongSection/SongSection';
import { supabase } from '../../App/components/supabaseClient';

const Gallery = () => {
	const [numSongs, setNumSongs] = useState<any[] | null>([]);

	const fetchSongs = async () => {
		let { data, error, status } = await supabase
			.from('songs')
			.select('song_id')
			.eq('is_active', 'true')
			.order('song_id');

		if (error && status !== 406) {
			console.error(error);
		} else {
			console.log(`TOTAL OF ${data?.length} SONGS FOUND`);
			setNumSongs(data);
		}
	};

	const DEFAULT_INDEX = 1;
	const [song, setSong] = useState(DEFAULT_INDEX);

	const handleSongChange = (e: any) => {
		console.log(`Setting song to id: ${e.target.value}`);
		setSong(parseInt(e.target.value));
	};

	useEffect(() => {
		fetchSongs();
	}, []);

	return (
		<Flex direction="column" alignItems="center" justifyContent="center">
			<ButtonGroup
				backgroundColor={useColorModeValue('gray.50', 'gray.900')}
				p="0.5rem 1rem"
				borderRadius="1rem"
				spacing={4}
			>
				{numSongs?.map((entry, i) => (
					<Button
						size={'sm'}
						key={i + 1}
						value={entry['song_id']}
						borderRadius="full"
						variant="solid"
						bgColor={song === entry['song_id'] ? 'brand.green' : 'brand.pink'}
						_hover={{
							transform: 'scale(1.2)',
						}}
						_active={{
							transform: 'scale(1.3)',
						}}
						transition="all cubic-bezier(.05,.38,.67,.99) 0.2s"
						onClick={handleSongChange}
					>
						{i + 1}
						{/*<TagCloseButton />*/}
					</Button>
				))}
			</ButtonGroup>
			<SongSection songId={song} />
		</Flex>
	);
};

export default Gallery;
