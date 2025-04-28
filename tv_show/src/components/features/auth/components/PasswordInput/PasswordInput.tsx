import { LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
	FormControl,
	InputGroup,
	InputLeftElement,
	Input,
	InputRightElement,
	IconButton,
	FormErrorMessage,
	Flex,
	forwardRef,
} from '@chakra-ui/react';
import { ReactNode, useState } from 'react';

interface IPasswordInputProps {
	error?: string;
	children: ReactNode;
}

export const PasswordInput = forwardRef(({ error, children, ...rest }: IPasswordInputProps, ref) => {
	const [visible, setVisible] = useState(false);

	const onClickHandler = () => {
		setVisible(!visible);
	};

	return (
		<FormControl isInvalid={Boolean(error)}>
			<Flex direction="column">
				<InputGroup size="md">
					<InputLeftElement padding="16px 0px 16px 24px">
						<LockIcon />
					</InputLeftElement>
					<Input type={visible ? 'text' : 'password'} {...rest} ref={ref} />
					<InputRightElement>
						<IconButton
							icon={visible ? <ViewOffIcon /> : <ViewIcon />}
							aria-label="Show or hide password button"
							onClick={onClickHandler}
							variant="unstyled"
						/>
					</InputRightElement>
				</InputGroup>
				{error && (
					<FormErrorMessage pl={2} color="error">
						{error === 'required'
							? `${children} is required!`
							: error === 'minLength'
							? 'Password is too short!'
							: 'Password doesn`t match!'}
					</FormErrorMessage>
				)}
			</Flex>
		</FormControl>
	);
});
