import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { LoginForm } from './LoginForm';
import { mutator } from '@/fetchers/mutators';
import { swrKeys } from '@/fetchers/swrKeys';

jest.mock('@/fetchers/mutators', () => {
	return {
		mutator: jest.fn().mockResolvedValue(null),
	};
});

describe('LoginForm', () => {
	it('should call mutator function with provided credentials', async () => {
		render(<LoginForm />);

		const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
		const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;

		fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
		fireEvent.change(passwordInput, { target: { value: '12345678' } });

		const logInButton = screen.getByText('LOG IN');

		act(() => {
			logInButton.click();
		});

		await waitFor(() => {
			expect(mutator).toHaveBeenCalledWith(swrKeys.signIn, {
				arg: { email: emailInput.value, password: passwordInput.value },
			});
		});
	});
});
