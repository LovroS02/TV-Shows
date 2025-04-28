import { fetcher } from '@/fetchers/fetcher';
import { swrKeys } from '@/fetchers/swrKeys';
import useSWR from 'swr';

export const useUser = () => {
	return useSWR<{ user: { id: string; email: string; image_url: string } }>(swrKeys.getUser, fetcher);
};
