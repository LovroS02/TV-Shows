import { render, screen } from '@testing-library/react';
import { ShowCard } from './ShowCard';

describe('ShowCard', () => {
	const mockShow1 = {
		title: 'test',
		description: 'test test test',
		id: '100',
		image_url: 'https://fakeimg.pl/600x400',
		average_rating: 0 || null || undefined,
		no_of_reviews: 0,
	};

	const mockShow2 = {
		title: 'test',
		description: 'test test test',
		id: '100',
		image_url: 'https://fakeimg.pl/600x400',
		average_rating: 4,
		no_of_reviews: 0,
	};

	it('should contain Image element with url', () => {
		render(<ShowCard show={mockShow1} />);

		const image = screen.getByRole('img');
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('src', mockShow1.image_url);
	});

	it('should render show title', () => {
		render(<ShowCard show={mockShow1} />);

		expect(screen.getByText(mockShow1.title)).toBeInTheDocument();
	});

	it('should render show average rating as no rating', () => {
		render(<ShowCard show={mockShow1} />);

		expect(screen.getByText('no rating')).toBeInTheDocument();
	});

	it('should render show average rating', () => {
		render(<ShowCard show={mockShow2} />);

		expect(screen.getByText(mockShow2.average_rating + '/5')).toBeInTheDocument();
	});
});
