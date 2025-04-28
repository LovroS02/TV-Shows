'use client';

import { useContext } from 'react';
import { PickerContext } from '../Picker';
import { Card, CardBody, CardFooter, Flex, Image } from '@chakra-ui/react';
import { createRoundShowsMatrix } from '@/services/createShowsMatrix';

export const PickerShowStep = () => {
	const { roundShows, currentRound, currentStep, selectedShows, setSelectedShows, setSelected } =
		useContext(PickerContext);

	const duels = createRoundShowsMatrix(currentRound, roundShows);

	return (
		<Flex gap={4}>
			{duels[currentStep % Math.floor(4 / currentRound)].map((show) => {
				const isSelected = selectedShows[currentRound - 1].find((s) => s === show);
				if (isSelected) {
					setSelected(true);
				}
				return (
					<Card
						key={show.id}
						variant={{ base: 'pickerMobile', sm: 'pickerMobile', md: 'picker' }}
						onClick={
							isSelected
								? () => {
										const copySelectedShows = [...selectedShows];
										copySelectedShows[currentRound - 1] = copySelectedShows[currentRound - 1].filter((s) => s !== show);
										setSelectedShows(copySelectedShows);
										setSelected(false);
								  }
								: () => {
										const copySelectedShows = [...selectedShows];
										copySelectedShows[currentRound - 1] = copySelectedShows[currentRound - 1].filter(
											(s) => s !== duels[currentStep % Math.floor(4 / currentRound)].find((s) => s !== show)
										);
										copySelectedShows[currentRound - 1].push(show);
										setSelectedShows(copySelectedShows);
										setSelected(true);
								  }
						}
						borderColor={isSelected ? 'purple.200' : 'purple.700'}
						borderWidth="thick"
					>
						<CardBody>
							<Image
								src={show.image_url}
								fallbackSrc="https://fakeimg.pl/600x400"
								alt={show.title + ' image'}
								width="100%"
								height="100%"
								objectFit="cover"
							/>
						</CardBody>
						<CardFooter>{show.title}</CardFooter>
					</Card>
				);
			})}
		</Flex>
	);
};
