export interface IReview {
    rating: number;
    comment: string;
    id: string;
	show_id: string;
	user: {
		id: string;
		email: string;
		image_url: string;
	};
}