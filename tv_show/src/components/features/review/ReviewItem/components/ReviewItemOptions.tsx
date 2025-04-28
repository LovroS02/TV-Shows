'use client';

import { Menu, MenuButton, Button, MenuList, Flex, MenuItem } from '@chakra-ui/react';
import { UpdateReviewButton } from '../../UpdateReviewButton/UpdateReviewButton';
import { deleteReview } from '@/fetchers/mutators';
import { swrKeys } from '@/fetchers/swrKeys';
import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { IReview } from '@/typings/review';
import CIcon from '@coreui/icons-react';
import { cilOptions } from '@coreui/icons';

interface IReviewItemOptionsProps {
	review: IReview;
}

export const ReviewItemOptions = ({ review, ...rest }: IReviewItemOptionsProps) => {
	const { trigger } = useSWRMutation(swrKeys.deleteReview(review.id), deleteReview, {
		onSuccess: () => {
			mutate(swrKeys.getReviews(review.show_id));
		},
	});

	const onDelete = async () => {
		await trigger();
	};
	return (
		<Menu placement="bottom-end">
			<MenuButton
				as={Button}
				variant="menu"
				rightIcon={<CIcon icon={cilOptions} height={24} width={24} color="white" />}
				{...rest}
			/>
			<MenuList width="128px" minW="128px" height="82px" minH="82px" padding={0} border={0} borderRadius="24px">
				<Flex direction="column" padding="18px 0px 16px 24px" gap="20px" alignItems="flex-start">
					<UpdateReviewButton comment={review.comment} rating={review.rating} id={review.id} show_id={review.show_id} />
					<Button onClick={onDelete} variant="menuItem">
						DELETE
					</Button>
				</Flex>
			</MenuList>
		</Menu>
	);
};
