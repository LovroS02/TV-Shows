import { render, screen } from '@testing-library/react';
import { ReviewForm } from './ReviewForm';

describe('ReviewForm', () => {
	it('should render input comment', () => {
		render(<ReviewForm id='106' />);

		expect(screen.getByRole('textbox')).toBeInTheDocument();
	});

	it('should render input rating', () => {
		render(<ReviewForm id="106" />);

		expect(screen.getByText('Rating')).toBeInTheDocument();
	});

	it('should render button', () => {
		render(<ReviewForm id="106" />);

		expect(screen.getByText('POST')).toBeInTheDocument();
	});
});
