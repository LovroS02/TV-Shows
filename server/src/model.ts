export interface Review {
	idReview: number;
	comment: string;
	grade: number;
}

export interface Show {
	idShow: number;
	title: string;
	details: {
		author: string;
		genre: string;
		release_date: string;
		description: string;
		image: string;
	};
	reviews: Array<Review>;
}

export type UserRole = 'user' | 'admin' | 'superadmin';

export interface User {
	idUser: number;
	name: string;
	surname: string;
	email: string;
	password: string;
	role: UserRole;
	subscription?: Subscription;
}

export type SubscriptionType = 'monthly' | 'annual';

export interface Subscription {
	idSubscription: number;
	start_date: string;
	end_date: string;
	type: SubscriptionType;
	bank_card: BankCard;
}

export interface BankCard {
	card_number: string;
	expire_date: string;
}