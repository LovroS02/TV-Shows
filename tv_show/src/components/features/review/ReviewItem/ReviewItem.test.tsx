import { act, render, renderHook, screen, waitFor } from '@testing-library/react';
import { ReviewItem } from './ReviewItem';
import { deleteReview } from '@/fetchers/mutators';
import { mutate } from 'swr';
import { useUser } from '@/hooks/useUser';

jest.mock('@/fetchers/mutators', () => {
	return {
		deleteReview: jest.fn().mockResolvedValue(null),
	};
});

jest.mock('@/hooks/useUser', () => {
	return {
		useUser: jest.fn().mockResolvedValue({ data: { user: { id: '1', email: 'test@gmail.com', image_url: '' } } }),
	};
});

jest.mock('swr', () => {
	return {
		mutate: jest.fn(),
	};
});

describe('ReviewItem', () => {
	const mockReview = {
		rating: 1,
		comment: 'test test test',
		id: '10000',
		show_id: '100',
		user: { id: '1', email: 'test@gmail.com', image_url: '' },
	};

	it('should render review/user email', () => {
		render(<ReviewItem review={mockReview} />);

		expect(screen.getByText(mockReview.user.email)).toBeInTheDocument();
	});

	it('should render review rating', () => {
		render(<ReviewItem review={mockReview} />);

		expect(screen.getByText(mockReview.rating + '/5')).toBeInTheDocument();
	});

	it('should render review comment', () => {
		render(<ReviewItem review={mockReview} />);

		expect(screen.getByText(mockReview.comment)).toBeInTheDocument();
	});

	it('should render delete Button', () => {
		render(<ReviewItem review={mockReview} />);

		const { result } = renderHook(useUser);

		if (result.current.data?.user.email) {
			expect(screen.getByRole('button')).toBeInTheDocument();
		}
	});

	it('should call deleteReview and mutate on success', async () => {
		render(<ReviewItem review={mockReview} />);

		const { result } = renderHook(useUser);

		if (result.current.data?.user.email) {
			const deleteButton = await screen.findByRole('button');

			act(() => {
				deleteButton.click();
			});

			await waitFor(() => {
				expect(deleteReview).toHaveBeenCalled();
				expect(mutate).toHaveBeenCalled();
			});
		}
	});
});
