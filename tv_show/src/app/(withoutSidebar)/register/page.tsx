'use client';

import { RegistrationForm } from '@/components/features/auth/RegistrationForm/RegistrationForm';
import { Flex } from '@chakra-ui/react';

export default function Register() {
	return (
		<Flex
			bg={{ base: 'purple.400', sm: 'purple.400', md: 'purple.700' }}
			width="100%"
			height="100vh"
			alignItems="center"
			justifyContent="center"
		>
			<RegistrationForm />
		</Flex>
	);
}
