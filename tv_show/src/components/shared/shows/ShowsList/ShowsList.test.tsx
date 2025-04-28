import { render } from '@testing-library/react';
import { ShowsList } from './ShowsList';
import { ShowCard } from '../ShowCard/ShowCard';

jest.mock('../ShowCard/ShowCard', () => {
	return { ShowCard: jest.fn().mockReturnValue(null) };
});

describe('ShowsList', () => {
	const mockShows = [
		{
			title: 'test',
			description: 'test test test',
			id: '100',
			image_url: 'https://fakeimg.pl/600x400',
			average_rating: 0 || null || undefined,
			no_of_reviews: 0,
		},
		{
			title: 'test',
			description: 'test test test',
			id: '100',
			image_url: 'https://fakeimg.pl/600x400',
			average_rating: 4,
			no_of_reviews: 0,
		},
	];

	it('should render all provided shows', () => {
		render(<ShowsList shows={mockShows} />);

		expect(ShowCard).toHaveBeenCalledTimes(2);
	});

	it('should render ShowCard', () => {
		render(<ShowsList shows={mockShows} />);

		mockShows.forEach((show, index) => {
			expect(ShowCard).toHaveBeenNthCalledWith(index + 1, { show }, expect.anything());
		});
	});
});
