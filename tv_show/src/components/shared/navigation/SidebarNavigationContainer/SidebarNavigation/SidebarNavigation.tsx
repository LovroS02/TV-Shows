'use client';

import { Flex } from '@chakra-ui/react';
import { SidebarNavigationContent } from '../components/SidebarNavigationContent/SidebarNavigationContent';
import { AppLogo } from '../../AppLogo/AppLogo';

export const SidebarNavigation = () => {
	return (
		<Flex hideBelow="md" direction="column" bg="purple.700" padding="24px 0px 56px 30px" width="400px">
			<AppLogo />
			<SidebarNavigationContent />
		</Flex>
	);
};
