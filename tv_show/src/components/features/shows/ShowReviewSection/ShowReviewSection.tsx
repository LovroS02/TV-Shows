import { IReview } from '@/typings/review';
import { IShow } from '@/typings/show';
import { Fragment } from 'react';
import { ReviewList } from '../../review/ReviewList/ReviewList';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { Flex, Spinner } from '@chakra-ui/react';
import { ShowDetails } from '../ShowDetails/ShowDetails';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { WarningIcon } from '@chakra-ui/icons';
import { swrKeys } from '@/fetchers/swrKeys';
import { fetcher } from '@/fetchers/fetcher';
import { calculateAverageRating } from '@/services/calculate';

interface IShowReviewResponse {
	show: IShow;
}

interface IReviewResponse {
	reviews: Array<IReview>;
}

export const ShowReviewSection = () => {
	const params = useParams();

	const { data, isLoading, error } = useSWR<IShowReviewResponse>(swrKeys.getShow(params.id as string), fetcher);

	const {
		data: reviews,
		isLoading: reviewsLoading,
		error: reviewsError,
	} = useSWR<IReviewResponse>(swrKeys.getReviews(params.id as string), fetcher);

	if (error || reviewsError) {
		return <WarningIcon color="white" boxSize={100} mx="50%" />;
	}

	if (isLoading || !data || reviewsLoading || !reviews) {
		return <Spinner thickness="8px" emptyColor="darkblue" color="white" boxSize={100} ml="25%" mt="25%" />;
	}

	return (
		<Fragment>
			<Flex
				overflowY="auto"
				height="100vh"
				direction="column"
				bg="purple.700"
				padding={{
					base: '32px 16px 36px 16px',
					sm: '32px 16px 36px 16px',
					md: '32px 16px 36px 16px',
					lg: '30px 30px 64px 30px',
				}}
			>
				<Flex>
					{data && <ShowDetails show={{ ...data.show, average_rating: calculateAverageRating(reviews.reviews) }} />}
				</Flex>
				<ReviewForm id={data.show.id} />
				<ReviewList reviewList={reviews.reviews} />
			</Flex>
		</Fragment>
	);
};
