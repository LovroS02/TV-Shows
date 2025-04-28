import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const helpers = createMultiStyleConfigHelpers(['dialog', 'closeButton', 'header', 'body', 'footer']);

const defaultProps = {
	size: 'lg',
};

const Modal = helpers.defineMultiStyleConfig({
	defaultProps,
	baseStyle: {
		dialog: {
			borderRadius: 'modalRadius',
			padding: '24px',
			bg: 'purple.700',
			color: 'white',
		},
		closeButton: {
			top: '24px',
			right: '24px',
			color: 'white',
			width: '24px',
			height: '24px',
			_hover: {
				bg: 'inherit',
			},
		},
		header: {
			padding: '0px',
			fontSize: 'xl',
			fontWeight: 'regular',
		},
		body: {
			padding: '10px 24px 16px 24px',
		},
		footer: {
			padding: '0px',
		},
	},

	variants: {
		mobile: {
			dialog: {
				padding: '16px',
			},
			header: {
				fontSize: 'lg',
				fontWeight: 'regular',
			},
			closeButton: {
				top: '24px',
				right: '24px',
				color: 'white',
				width: '16px',
				height: '16px',
				_hover: {
					bg: 'inherit',
				},
			},
		},
	},
});

export default Modal;
