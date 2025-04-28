import { useContext } from 'react';
import { PickerContext } from '../Picker';
import { PickerShowStep } from './PickerShowStep';
import { PickerShowResult } from './PickerShowResult';

export const PickerStepper = () => {
	const { currentRound } = useContext(PickerContext);

	if (currentRound < 4) {
		return <PickerShowStep />;
	} else {
		return <PickerShowResult />;
	}
};
