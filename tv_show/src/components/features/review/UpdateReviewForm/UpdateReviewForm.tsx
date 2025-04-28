import { CustomRatingInput } from '@/components/shared/input/CustomRatingInput/CustomRatingInput';
import { Flex, Input, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface IReviewFormProps {
	onFormSubmit: (data: IUpdateReviewFormInputs) => void;
	comment: string;
	rating: number;
}

interface IUpdateReviewFormInputs {
	comment: string;
	rating: number;
}

export const UpdateReviewForm = ({ onFormSubmit, comment, rating }: IReviewFormProps) => {
	const [commentValue, setCommentValue] = useState(comment);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<IUpdateReviewFormInputs>({
		values: {
			rating: rating,
			comment: comment,
		},
	});

	const handleChange = (comment: string) => {
		setCommentValue(comment);
	};

	return (
		<Flex
			as="form"
			gap={3}
			direction="column"
			alignItems="flex-start"
			justifyContent="center"
			id="update-review-form"
			onSubmit={handleSubmit(onFormSubmit)}
		>
			<FormControl isInvalid={Boolean(errors.comment)}>
				<Flex>
					<Input
						{...register('comment', { required: true })}
						type="text"
						placeholder="Enter review"
						value={commentValue}
						onChange={(event) => handleChange(event.target.value)}
						variant={{ base: 'mobileForm', sm: 'mobileForm', md: 'form' }}
					/>
					<FormErrorMessage>Comment is required!</FormErrorMessage>
				</Flex>
			</FormControl>
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
		</Flex>
	);
};
