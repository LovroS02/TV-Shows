import { IShow } from '@/typings/show';

export const getRoundShows = (noOfShows: number, shows: Array<IShow>) => {
	let counter = 0;
	const newShows: Array<IShow> = [];
	while (counter < noOfShows) {
		const index = Math.floor(Math.random() * shows.length);
		if (!newShows.find((show) => show === shows[index])) {
			newShows.push(shows[index]);
			counter++;
		}
	}

	return newShows;
};
