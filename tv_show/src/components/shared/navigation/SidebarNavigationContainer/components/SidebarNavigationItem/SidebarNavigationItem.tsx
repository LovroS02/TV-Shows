import { Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface ISidebarNavigationItemProps {
	href: string;
	children: React.ReactNode;
	onClickHandler?: () => void;
}

export const SidebarNavigationItem = ({ href, children, onClickHandler }: ISidebarNavigationItemProps) => {
	const path = usePathname();

	return (
		<Button
			as={NextLink}
			href={href}
			bg={path === href ? 'purple.400' : { base: 'purple.400', sm: 'purple.400', md: 'purple.700' }}
			onClick={onClickHandler}
			variant={onClickHandler ? 'logout' : 'solid'}
		>
			{children}
		</Button>
	);
};
