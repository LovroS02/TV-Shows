import { Progress } from '@chakra-ui/react';
import { useContext } from 'react';
import { PickerContext } from '../Picker';

export const PickerProgress = () => {
	const { currentStep } = useContext(PickerContext);
	const progress = (currentStep / 7) * 100;

	return <Progress value={progress} />;
};
