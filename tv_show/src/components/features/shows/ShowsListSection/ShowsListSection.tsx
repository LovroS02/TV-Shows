'use client';

import { MobileShowsList } from '@/components/shared/shows/ShowsList/MobileShowsList';
import { ShowsList } from '@/components/shared/shows/ShowsList/ShowsList';
import { fetcher } from '@/fetchers/fetcher';
import { swrKeys } from '@/fetchers/swrKeys';
import { IShow } from '@/typings/show';
import { WarningIcon } from '@chakra-ui/icons';
import { Flex, Spinner } from '@chakra-ui/react';
import useSWR from 'swr';

interface IShowsListResponse {
	shows: Array<IShow>;
}

export const ShowsListSection = () => {
	const { data, isLoading, error } = useSWR<IShowsListResponse>(swrKeys.allShows, fetcher);

	if (error) {
		return <WarningIcon color="purple.700" boxSize={100} mx="50%" />;
	}

	if (isLoading) {
		return <Spinner thickness="8px" emptyColor="purple.700" color="white" boxSize={100} ml="25%" mt="25%" />;
	}

	return (
		<Flex
			direction={{ base: 'column', sm: 'column', md: 'row' }}
			overflowY="auto"
			height="100vh"
			bg="purple.700"
			width="100%"
		>
			{data && <ShowsList shows={data.shows} />}
			{data && <MobileShowsList shows={data.shows} />}
		</Flex>
	);
};
