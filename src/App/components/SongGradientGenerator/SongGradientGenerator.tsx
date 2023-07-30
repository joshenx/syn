import './style.css';

import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Box, Stack, Tooltip, CircularProgress } from '@chakra-ui/react';
import MeshGradient from 'mesh-gradient.js';
import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { IoMdRefresh } from 'react-icons/io';
import { AiOutlineEyeInvisible, AiFillEye } from 'react-icons/ai';

const DEFAULT_COLORS = ['#000000', '#222222', '#444444'];

const canvasId = 'my-canvas';

export const SongGradientGenerator = ({ data }: { data: any[] | null }) => {
	const [colors, setColors] = useState<any[] | undefined>(undefined);
	const [isHidden, toggleHidden] = useState(true);
	const [gradient] = useState(new MeshGradient());

	const maxTries = 5;
	var t = 500;

	function rejectDelay(reason: any) {
		return new Promise(function (resolve, reject) {
			setTimeout(reject.bind(null, reason), t);
		});
	}

	function attempt() {
		if (data) {
			const colorsFromData = data.slice(0, 4).map((row) => row.hex_code);
			console.log('DATA FOUND : ' + colorsFromData);
			if (colorsFromData.length <= 1) {
				setColors(DEFAULT_COLORS);
			} else {
				setColors(colorsFromData);
			}
			return colorsFromData;
		} else {
			console.log('DATA N : ' + data);
			throw DEFAULT_COLORS;
		}
	}

	function processResult(res: any) {
		console.log(`Colors found: ${res}`);
	}

	function initGradient() {
		console.log(`Initialising gradient with colors: ${colors}`);
		gradient.initGradient('#' + canvasId, colors);
		gradient.changePosition(Math.floor(Math.random() * 1000));
	}

	function errorHandler(defColors: any) {
		setColors(defColors);
	}

	useEffect(() => {
		if (data) {
			var p = new Promise(() => attempt());
			for (var i = 0; i < maxTries; i++) {
				p = p.catch(attempt).catch(rejectDelay);
			}
			p = p.then(processResult).catch(errorHandler);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	useEffect(() => {
		if (colors) {
			initGradient();
		}
		toggleHidden(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [colors]);

	const refreshGradient = () => {
		if (colors === DEFAULT_COLORS) {
			initGradient();
		} else {
			gradient.changePosition(Math.floor(Math.random() * 1000));
		}
	};

	const handleToggleHidden = () => {
		toggleHidden(!isHidden);
		console.log(`Should hide gradient: ${isHidden}`);
		if (isHidden) {
			gradient.initGradient('#' + canvasId, DEFAULT_COLORS);
		} else {
			gradient.initGradient('#' + canvasId, colors);
		}
		gradient.changePosition(Math.floor(Math.random() * 1000));
	};

	return (
		<Stack p="1rem" direction="column" overflow="hidden" align="center">
			{colors ? (
				<Box position="relative">
					<IconContext.Provider
						value={{
							style: {
								position: 'absolute',
								margin: '1rem',
								left: 1,
								color: 'white',
								cursor: 'pointer',
							},
						}}
					>
						<IoMdRefresh onClick={refreshGradient} />
					</IconContext.Provider>

					<IconContext.Provider
						value={{
							style: {
								position: 'absolute',
								margin: '1rem',
								marginLeft: 'auto',
								marginRight: 'auto',
								left: '0',
								right: '0',
								color: 'white',
								cursor: 'pointer',
							},
						}}
					>
						{isHidden ? (
							<AiOutlineEyeInvisible onClick={handleToggleHidden} />
						) : (
							<AiFillEye onClick={handleToggleHidden} />
						)}
					</IconContext.Provider>
					<Tooltip
						hasArrow
						label="This gradient was generated with the top 4 hexcodes!"
						maxWidth="150px"
						placement="top"
						fontSize="xs"
					>
						<InfoOutlineIcon
							cursor="help"
							position="absolute"
							m="1rem"
							right={0}
							color="white"
						/>
					</Tooltip>
					<canvas id={canvasId} />
				</Box>
			) : (
				<CircularProgress isIndeterminate color="brand.green" />
			)}
		</Stack>
	);
};

export default SongGradientGenerator;
