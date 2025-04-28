import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const helpers = createMultiStyleConfigHelpers(['closeButton', 'body', 'dialog']);

const defaultProps = {
	size: 'xs',
};

const Drawer = helpers.defineMultiStyleConfig({
	defaultProps,
	baseStyle: {
		closeButton: {
			top: '16px',
			right: '16px',
			color: 'white',
			width: '24px',
			height: '24px',
			_hover: {
				bg: 'inherit',
			},
		},
		body: {
			bg: 'purple.400',
			borderTopLeftRadius: '24px',
			paddingTop: '84px',
			paddingBottom: '56px',
			paddingLeft: '12px',
		},
		dialog: {
			bg: 'purple.400',
			borderTopLeftRadius: '24px',
			marginTop: '24px',
		},
	},
});

export default Drawer;
