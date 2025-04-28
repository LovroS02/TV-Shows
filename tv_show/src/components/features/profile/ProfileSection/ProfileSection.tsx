import { useUser } from '@/hooks/useUser';
import { Avatar, Button, Flex, Heading, Input, Text } from '@chakra-ui/react';

export const ProfileSection = () => {
	const { data } = useUser();

	return (
		<Flex bg="purple.700" width="100%" height="100vh" justifyContent="center" alignItems="center" direction="column">
			<Flex direction="column" alignItems="center" gap={{ base: '0px', sm: '0px', md: '4px' }}>
				<Heading fontSize="xs" fontWeight="lightBold" height="24px" color="white">
					EMAIL
				</Heading>
				<Text fontSize={{ base: 'sm', sm: 'sm', md: 'lg' }} fontWeight="lightBold" color="white" height="24px">
					{data?.user.email}
				</Text>
			</Flex>
			{data?.user.image_url ? (
				<Flex
					direction="column"
					alignItems="center"
					pt={{ base: '40px', sm: '40px', md: '80px' }}
					gap={{ base: '42px', sm: '42px', md: '42px' }}
				>
					<Avatar src={data.user.image_url} bg="purple.400" boxSize={{ base: 172, sm: 172, md: 260 }} />
					<Button variant="postForm" width="202px" padding="18px 44px 18px 44px">
						UPLOAD IMAGE
					</Button>
				</Flex>
			) : (
				<Input
					variant={{ base: 'profileMobile', sm: 'profileMobile', md: 'profileMobile', lg: 'profile' }}
					mt="38px"
					type="image"
					src="https://fakeimg.pl/600x400"
				/>
			)}
		</Flex>
	);
};
