import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const helpers = createMultiStyleConfigHelpers(['track', 'filledTrack']);

const defaultProps = {
	size: 'md',
};

const Progress = helpers.defineMultiStyleConfig({
	defaultProps,
	baseStyle: {
		track: {
			bg: 'white',
			borderRadius: 'progressRadius',
		},
		filledTrack: {
			bg: 'purple.200',
		},
	},
});

export default Progress;
