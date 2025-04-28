import { StarIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';

interface CustomRatingInputProps {
	label: string;
	value: number;
	onChange?: (index: number) => void;
}

export const CustomRatingInput = ({ label, value, onChange, ...rest }: CustomRatingInputProps) => {
	const [hoveredIndex, setHoveredIndex] = useState(0);

	const onHover = (index: number) => {
		setHoveredIndex(index);
	};

	const getColor = (index: number) => {
		if (onChange) {
			if (hoveredIndex) {
				if (index <= hoveredIndex) {
					return 'gold';
				}
				return 'gray.300';
			}
		}
		if (index <= value) {
			return 'gold';
		}
		return 'gray.300';
	};

	return (
		<Flex alignItems="center">
			<Text color="white" pr={4} {...rest}>
				{label}
			</Text>
			<Flex gap={1} onMouseLeave={() => setHoveredIndex(0)}>
				{Array.from(Array(5)).map((_, index) => {
					return (
						<StarIcon
							key={index}
							boxSize={onChange ? '18px' : '14px'}
							color={getColor(index + 1)}
							onMouseOver={() => onHover(index + 1)}
							cursor={onChange ? 'pointer' : 'default'}
							pointerEvents={onChange ? 'initial' : 'none'}
							onClick={() => onChange?.(index + 1)}
						/>
					);
				})}
			</Flex>
		</Flex>
	);
};
