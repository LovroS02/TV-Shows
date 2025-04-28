import { IShow } from '@/typings/show';
import { fetcher } from './fetcher';

interface IShowsListResponse {
	shows: Array<IShow>;
}

export function getShowsList() {
	return fetcher<IShowsListResponse>('/api/shows');
}

export function getTopRatedShowsList() {
	return fetcher<IShowsListResponse>('/api/shows/top-rated');
}

export function getShow(id: string) {
    return fetcher<IShow>(`/api/shows/${id}`)
}
