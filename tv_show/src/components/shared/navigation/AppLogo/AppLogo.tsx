import { Flex, Text } from '@chakra-ui/react';
import { cilTv } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

export const AppLogo = () => {
	return (
		<Flex fontStyle="italic" color="white" alignItems="center" gap={2} >
			<CIcon icon={cilTv} size="sm" height={30} />
			<Text fontFamily="cursive" fontSize="20px">
				TV SHOW APP
			</Text>
		</Flex>
	);
};
