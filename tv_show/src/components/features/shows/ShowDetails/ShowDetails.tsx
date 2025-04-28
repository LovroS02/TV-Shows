import { IShow } from '@/typings/show';
import { StarIcon } from '@chakra-ui/icons';
import { Image, Heading, Text, Flex } from '@chakra-ui/react';

interface ShowDetailsProps {
	show: IShow;
}

export const ShowDetails = ({ show }: ShowDetailsProps) => {
	const rating = () => {
		if (show.average_rating !== undefined && show.average_rating !== 0 && show.average_rating !== null) {
			return show.average_rating + '/5';
		}
		return 'no ratings';
	};

	return (
		<Flex direction="column" bg="white" borderRadius="24px" overflow="hidden" color="purple.400" width="100%">
			<Image
				src={show.image_url}
				alt="Show image"
				fallbackSrc="https://fakeimg.pl/600x400"
				width="100%"
				height={{ base: '344px', sm: '344px', md: '344px', lg: '440px' }}
				objectFit="cover"
			/>
			<Flex
				padding={{
					base: '24px 30px 28px 24px',
					sm: '24px 30px 28px 24px',
					md: '24px 30px 28px 24px',
					lg: '40px 50px 40px 40px',
				}}
				direction={{ base: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'row' }}
				width="100%"
				justifyContent="space-between"
			>
				<Flex direction="column" width="100%" pb={{ base: '16px', sm: '16px', md: '16px', lg: '16px', xl: '0px' }}>
					<Heading
						width="100%"
						height={{ base: '20px', sm: '20px', md: '20px', lg: '40px' }}
						fontSize={{ base: 'xl', sm: 'xl', md: 'xl', lg: 'xxl' }}
						fontWeight="bold"
					>
						{show.title}
					</Heading>
					<Flex alignItems="baseline" gap={2.5} pt={{ base: 2.5, sm: 2.5, md: 2.5, lg: 1 }}>
						<StarIcon boxSize={{ base: '14px', sm: '14px', md: '14px', lg: '18px' }} />
						<Text fontSize={{ base: 'xs', sm: 'xs', md: 'xs', lg: 'xl' }} fontWeight="regular">
							{rating()}
						</Text>
					</Flex>
				</Flex>
				<Text
					width="100%"
					textAlign="justify"
					fontSize={{ base: 'xs', sm: 'xs', md: 'xs', lg: 'lg' }}
					fontWeight="regular"
				>
					{show.description}
				</Text>
			</Flex>
		</Flex>
	);
};
