import { IShow } from '@/typings/show';

export const createRoundShowsMatrix = (currentRound: number, shows: Array<IShow>) => {
	const showsDuels: Array<Array<IShow>> = [];
	for (let i = 0; i < 4 / currentRound; i++) {
		const showDuel: Array<IShow> = [];
		for (let j = 0; j < 2; j++) {
			showDuel.push(shows[2 * i + j]);
		}

		showsDuels.push(showDuel);
	}

	return showsDuels;
};
