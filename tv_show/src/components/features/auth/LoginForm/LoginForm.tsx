'use client';

import { AppLogo } from '@/components/shared/navigation/AppLogo/AppLogo';
import { mutator } from '@/fetchers/mutators';
import { swrKeys } from '@/fetchers/swrKeys';
import { useUser } from '@/hooks/useUser';
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

interface ILoginFormInputs {
	email: string;
	password: string;
}

export const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ILoginFormInputs>();
	const { mutate } = useUser();
	const { trigger, error } = useSWRMutation(swrKeys.signIn, mutator, {
		onSuccess: (data) => {
			mutate(data, { revalidate: false });
		},
	});

	const onSignUp = async (data: ILoginFormInputs) => {
		await trigger(data);
	};

	return (
		<Flex
			as="form"
			direction="column"
			onSubmit={handleSubmit(onSignUp)}
			bg="purple.400"
			color="white"
			height={{ base: '100%', sm: '100%', md: '500px' }}
			width={{ base: '100%', sm: '100%', md: '500px' }}
			alignItems="center"
			borderRadius={{ base: '0px', sm: '0px', md: '24px' }}
			padding={{ base: '158px 0px 182px 0px', sm: '158px 0px 182px 0px', md: '56px 0px 52px 0px' }}
		>
			{error && (
				<Alert status="error" bg="purple.400" color="error">
					Invalid login credentials. Please try again.
				</Alert>
			)}
			<AppLogo />
			<Flex
				direction="column"
				width="100%"
				padding={{ base: '58px 44px 44px 44px', sm: '58px 44px 44px 44px', md: '50px 56px 58px 56px' }}
				gap={{ base: '22px', sm: '22px', md: '30px' }}
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
				<PasswordInput
					{...{ ...register('password', { required: true }), placeholder: 'Password', variant: 'auth' }}
					error={errors?.password?.type}
				>
					Password
				</PasswordInput>
			</Flex>
			<Button isLoading={isSubmitting} type="submit" variant="postForm">
				LOG IN
			</Button>
			<Text fontSize={12} pt="28px">
				Don`t have an account?{' '}
				<Link href="/register" fontWeight="bold">
					Register
				</Link>
			</Text>
		</Flex>
	);
};
