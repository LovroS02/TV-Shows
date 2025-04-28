import { CustomRatingInput } from '@/components/shared/input/CustomRatingInput/CustomRatingInput';
import { IReview } from '@/typings/review';
import { Flex, Text, Avatar } from '@chakra-ui/react';
import { useUser } from '@/hooks/useUser';
import { ReviewItemOptions } from './components/ReviewItemOptions';

interface IReviewItemProps {
	review: IReview;
}

export const ReviewItem = ({ review }: IReviewItemProps) => {
	const { data } = useUser();

	return (
		<Flex
			bg="purple.400"
			width="100%"
			borderRadius="24px"
			padding={{
				base: '24px 24px 14px 26px',
				sm: '24px 24px 14px 26px',
				md: '24px 24px 14px 26px',
				lg: '28px 36px 28px 40px',
			}}
			alignItems={{ lg: 'center' }}
			position={{ lg: 'relative' }}
		>
			<Flex
				width="100%"
				bg="purple.400"
				direction={{ base: 'column', sm: 'column', md: 'column', lg: 'row' }}
				gap={{ base: '16px', sm: '16px', md: '16px', lg: '0px' }}
			>
				<Flex alignItems={{ lg: 'center' }} gap={{ base: 4, sm: 4, md: 4, lg: 5 }}>
					<Avatar src={review.user?.image_url} bg="purple.400" boxSize={10} />
					<Flex direction="column" gap={{ base: '2px', sm: '2px', md: '2px', lg: '6px' }}>
						<Text height="20px" fontSize={{ base: '14px', sm: '14px', md: '14px', lg: '16px' }}>
							{review.user?.email}{' '}
						</Text>
						<CustomRatingInput
							label={review.rating + '/5'}
							value={review.rating}
							{...{ height: '20px', fontSize: { base: '14px', sm: '14px', md: '14px', lg: '16px' } }}
						/>
					</Flex>
				</Flex>
				<Text
					height="24px"
					position={{ lg: 'absolute' }}
					left={{ lg: '344px' }}
					pr={{ lg: '32px' }}
					fontSize={{ base: '14px', sm: '14px', md: '14px', lg: '16px' }}
				>
					{review.comment}
				</Text>
			</Flex>
			{data?.user.email === review.user?.email && <ReviewItemOptions review={review} {...{}} />}
		</Flex>
	);
};
