'use client';

import { AppLogo } from '@/components/shared/navigation/AppLogo/AppLogo';
import { mutator } from '@/fetchers/mutators';
import { swrKeys } from '@/fetchers/swrKeys';
import {
	Alert,
	Avatar,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	Input,
	InputGroup,
	InputLeftElement,
	Link,
	Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';
import { PasswordInput } from '../components/PasswordInput/PasswordInput';

interface IRegistrationFormInputs {
	email: string;
	password: string;
	password_confirmation: string;
}

export const RegistrationForm = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<IRegistrationFormInputs>();
	const { trigger, error } = useSWRMutation(swrKeys.signUp, mutator);

	const onSignUp = async (data: IRegistrationFormInputs) => {
		await trigger(data);
	};

	return (
		<Flex
			as="form"
			direction="column"
			onSubmit={handleSubmit(onSignUp)}
			bg="purple.400"
			color="white"
			height={{ base: '100%', sm: '100%', md: '564px' }}
			width={{ base: '100%', sm: '100%', md: '494px' }}
			alignItems="center"
			borderRadius={{ base: '0px', sm: '0px', md: '24px' }}
			padding={{ base: '110px 0px 110px 0px', sm: '110px 0px 110px 0px', md: '56px 0px 48px 0px' }}
		>
			{error && (
				<Alert status="error" bg="purple.400" color="error">
					Email is not an email or email has already been taken.
				</Alert>
			)}
			<AppLogo />
			<Flex
				direction="column"
				width="100%"
				padding={{ base: '58px 44px 58px 44px', sm: '58px 44px 58px 44px', md: '50px 56px 36px 56px' }}
				gap={{ base: '36px', sm: '30px', md: '30px' }}
			>
				<FormControl isInvalid={Boolean(errors?.email)}>
					<Flex direction="column">
						<InputGroup size="md">
							<InputLeftElement padding="16px 0px 16px 24px">
								<Avatar size="xs" bg="purple.400" />
							</InputLeftElement>
							<Input {...register('email', { required: true })} type="email" placeholder="Email" variant="auth" />
						</InputGroup>
						<FormErrorMessage pl={2} color="error">
							Email is required!
						</FormErrorMessage>
					</Flex>
				</FormControl>
				<Flex direction="column" width="100%">
					<PasswordInput
						{...{
							...register('password', {
								required: true,
								minLength: 8,
							}),
							placeholder: 'Password',
							variant: 'auth',
						}}
						error={errors?.password?.type}
					>
						Password
					</PasswordInput>
					{watch('password') === '' && (
						<Text pl="32px" pt={1} fontSize={10}>
							At least 8 characters
						</Text>
					)}
				</Flex>
				<PasswordInput
					{...{
						...register('password_confirmation', {
							required: true,
							validate: (value) => value === watch('password'),
						}),
						placeholder: 'Confirm password',
						variant: 'auth',
					}}
					error={errors?.password_confirmation?.type}
				>
					Confirm password
				</PasswordInput>
			</Flex>
			<Button isLoading={isSubmitting} type="submit" variant="postForm">
				SIGN UP
			</Button>
			<Text fontSize="xxs" pt="28px">
				Already have an Account?{' '}
				<Link href="/login" fontWeight="bold">
					Login
				</Link>
			</Text>
		</Flex>
	);
};
