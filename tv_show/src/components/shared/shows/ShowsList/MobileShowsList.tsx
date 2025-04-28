'use client';

import { Flex } from '@chakra-ui/react';
import { ShowCard } from '../ShowCard/ShowCard';
import { IShow } from '@/typings/show';

interface IShowsListProps {
	shows: Array<IShow>;
}

export const MobileShowsList = ({ shows }: IShowsListProps) => {
	return (
		<Flex hideFrom="sm" direction="column" flexWrap="wrap" padding="24px 16px 16px 16px" gap="18px" alignItems="center">
			{shows.map((show) => (
				<ShowCard key={show.id} show={show} />
			))}
		</Flex>
	);
};
