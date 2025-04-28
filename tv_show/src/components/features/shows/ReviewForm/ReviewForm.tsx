import { CustomRatingInput } from '@/components/shared/input/CustomRatingInput/CustomRatingInput';
import { createReview } from '@/fetchers/mutators';
import { swrKeys } from '@/fetchers/swrKeys';
import { useUser } from '@/hooks/useUser';
import { Flex, Heading, Input, Button, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

interface IReviewFormProps {
	id: string;
}

interface IReviewFormInputs {
	comment: string;
	rating: number;
}

export const ReviewForm = ({ id }: IReviewFormProps) => {
	const { data: uid } = useUser();

	const { trigger } = useSWRMutation(swrKeys.createReview, createReview, {
		onSuccess: () => {
			mutate(swrKeys.getReviews(id));
		},
	});

	const {
		register,
		handleSubmit,
		control,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<IReviewFormInputs>();

	const onClickHandler = async (data: IReviewFormInputs) => {
		if (uid) {
			await trigger({ ...data, show_id: id });
		}
	};

	const isDisabled = () => {
		if (watch('comment')) {
			if (watch('rating')) {
				return false;
			}

			return true;
		}

		return true;
	};

	return (
		<Flex
			direction="column"
			as="form"
			padding={{ base: '40px 0px 0px 0px', sm: '40px 0px 0px 0px', md: '40px 0px 0px 0px', lg: '86px 0px 0px 0px' }}
			onSubmit={handleSubmit(onClickHandler)}
		>
			<Flex
				direction={{ base: 'column', sm: 'column', md: 'column', lg: 'row' }}
				gap={{ base: '22px', sm: '22px', md: '22px', lg: '26px' }}
			>
				<Heading
					fontSize={{ base: 'lg', sm: 'lg', md: 'lg', lg: 'xl' }}
					fontWeight="regular"
					width="174px"
					height="28px"
					color="white"
				>
					Reviews
				</Heading>
				<Flex direction="column" width="100%">
					<FormControl isInvalid={Boolean(errors.comment)}>
						<Flex direction="column" width="100%">
							<Input
								{...register('comment', { required: true })}
								type="text"
								placeholder="Enter review"
								variant={{ base: 'mobileForm', sm: 'mobileForm', md: 'mobileForm', lg: 'form' }}
							/>
							<FormErrorMessage>Comment is required!</FormErrorMessage>
						</Flex>
					</FormControl>
					<Flex alignItems="center" pt={{ base: '14px', sm: '14px', md: '14px', lg: '22px' }}>
						<FormControl isInvalid={Boolean(errors.rating)}>
							<Flex direction="column">
								<Controller
									control={control}
									name="rating"
									render={({ field: { onChange, value } }) => (
										<CustomRatingInput label="Rating" value={value} onChange={onChange} />
									)}
								/>
								<FormErrorMessage>Rating is required!</FormErrorMessage>
							</Flex>
						</FormControl>
						<Button
							isLoading={isSubmitting}
							type="submit"
							variant={{ base: 'mobilePostForm', sm: 'mobilePostForm', md: 'mobilePostForm', lg: 'postForm' }}
							isDisabled={isDisabled()}
						>
							POST
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};
