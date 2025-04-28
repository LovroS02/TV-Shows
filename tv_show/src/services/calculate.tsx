import { IReview } from "@/typings/review";

export const calculateAverageRating = (rl: Array<IReview>) => {
	let avg = 0;
	rl.forEach((review: IReview) => {
		avg += review.rating;
	});

	return parseFloat((avg / rl.length).toPrecision(2)) || 0;
};
