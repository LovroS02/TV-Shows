import { render } from '@testing-library/react';
import { ReviewItem } from '../ReviewItem/ReviewItem';
import { ReviewList } from './ReviewList';

jest.mock('../ReviewItem/ReviewItem', () => {
    return {
        ReviewItem: jest.fn().mockReturnValue(null),
    }
})

describe('ReviewList', () => {
    const mockReviews = [
        {
            rating: 1,
            comment: 'test test test',
            id: '10000',
            show_id: '100',
            user: { id: '1', email: 'test@gmail.com', image_url: '' },
        },
        {
            rating: 5,
            comment: 'test test test',
            id: '10001',
            show_id: '101',
            user: { id: '2', email: 'test2@gmail.com', image_url: '' },
        }
    ]

	it('should render ReviewItem', () => {
        render(<ReviewList reviewList={mockReviews} />)

		mockReviews.forEach((review, index) => {
			expect(ReviewItem).toHaveBeenNthCalledWith(index + 1, { review }, expect.anything());
		});
	});
});
