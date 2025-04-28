const apiUrl = 'https://tv-shows.infinum.academy';

export const swrKeys = {
	signUp: `${apiUrl}/users`,
	signIn: `${apiUrl}/users/sign_in`,
	getUser: `${apiUrl}/users/me`,
	allShows: `${apiUrl}/shows`,
	topRatedShows: `${apiUrl}/shows/top_rated`,
	createReview: `${apiUrl}/reviews`,
	getShow: (id: string) => `${apiUrl}/shows/${id}`,
	getReviews: (show_id: string) => `${apiUrl}/shows/${show_id}/reviews`,
	deleteReview: (id: string) => `${apiUrl}/reviews/${id}`,
	updateReview: (id: string) => `${apiUrl}/reviews/${id}`,
};
