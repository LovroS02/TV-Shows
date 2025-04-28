export interface IShow {
    id: string;
    image_url: string | undefined;
    title: string;
    description: string;
    average_rating: number | undefined;
    no_of_reviews: number;
}