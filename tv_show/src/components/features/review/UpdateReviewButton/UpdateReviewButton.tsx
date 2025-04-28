import { updateReview } from '@/fetchers/mutators';
import { swrKeys } from '@/fetchers/swrKeys';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Flex,
} from '@chakra-ui/react';
import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { UpdateReviewForm } from '../UpdateReviewForm/UpdateReviewForm';

interface IUpdateReviewButtonProps {
	comment: string;
	rating: number;
	id: string;
	show_id: string;
}

interface IUpdateReviewButtonInputs {
	comment: string;
	rating: number;
}

export const UpdateReviewButton = ({ comment, rating, id, show_id }: IUpdateReviewButtonProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { trigger } = useSWRMutation(swrKeys.updateReview(id), updateReview, {
		onSuccess: () => {
			mutate(swrKeys.getReviews(show_id));
			onClose();
		},
	});

	const onFormSubmit = async (data: IUpdateReviewButtonInputs) => {
		await trigger(data);
	};

	return (
		<>
			<Button variant="menuItem" onClick={onOpen}>
				EDIT
			</Button>

			<Modal
				isOpen={isOpen}
				onClose={onClose}
				size={{ base: 'sm', sm: 'sm', md: 'lg' }}
				variant={{ base: 'mobile', sm: 'mobile', md: 'default' }}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Update review</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<UpdateReviewForm onFormSubmit={onFormSubmit} comment={comment} rating={rating} />
					</ModalBody>

					<ModalFooter>
						<Flex gap={2}>
							<Button variant={{ base: 'mobileModal', sm: 'mobileModal', md: 'modal' }} onClick={onClose}>
								No
							</Button>
							<Button
								variant={{ base: 'mobileModal', sm: 'mobileModal', md: 'modal' }}
								form="update-review-form"
								type="submit"
							>
								Yes
							</Button>
						</Flex>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
