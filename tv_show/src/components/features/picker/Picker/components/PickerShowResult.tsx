import { useContext } from 'react';
import { PickerContext } from '../Picker';
import { Card, CardBody, CardFooter, Image } from '@chakra-ui/react';

export const PickerShowResult = () => {
	const { roundShows } = useContext(PickerContext);

	return (
		<>
			<Card variant={{ base: 'pickerMobile', sm: 'pickerMobile', md: 'picker' }} mx="25%">
				<CardBody>
					<Image
						src={roundShows[0].image_url}
						fallbackSrc="https://fakeimg.pl/600x400"
						alt={roundShows[0].title + ' image'}
						width="100%"
						height="100%"
						objectFit="cover"
					/>
				</CardBody>
				<CardFooter>{roundShows[0].title}</CardFooter>
			</Card>
		</>
	);
};
