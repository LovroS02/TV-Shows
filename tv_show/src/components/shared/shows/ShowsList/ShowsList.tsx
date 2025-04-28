'use client';

import { SimpleGrid } from '@chakra-ui/react';
import { ShowCard } from '../ShowCard/ShowCard';
import { IShow } from '@/typings/show';

interface IShowsListProps {
	shows: Array<IShow>;
}

export const ShowsList = ({ shows }: IShowsListProps) => {
	return (
		<SimpleGrid
			hideBelow="sm"
			columns={4}
			display="flex"
			flexWrap="wrap"
			padding="30px 30px 30px 30px"
			gap="30px"
			justifyContent="center"
			width="100%"
		>
			{shows.map((show) => (
				<ShowCard key={show.id} show={show} />
			))}
		</SimpleGrid>
	);
};
