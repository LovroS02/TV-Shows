import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const helpers = createMultiStyleConfigHelpers(['field']);

const defaultProps = {
	size: 'md',
};

const Input = helpers.defineMultiStyleConfig({
	defaultProps,
	baseStyle: {
		field: {
			fontFamily: 'Roboto',
			color: 'white',
			fontSize: 'sm',
			fontWeight: 'regular',
			borderRadius: 'inputRadius.md',
			bg: 'purple.400',
			height: '56px',
		},
	},

	variants: {
		auth: {
			field: {
				borderColor: 'white',
				border: '2px solid',

				_invalid: {
					borderColor: 'error',
					boxShadow: '0 0 0 2px error',
				},
				_focusVisible: {
					borderColor: 'white',
				},
				_hover: {
					borderColor: 'white',
				},
				_placeholder: {
					color: 'white',
				},
			},
		},

		form: {
			field: {
				height: '80px',
				width: '100%',
				borderRadius: 'inputRadius.md',
				bg: 'white',
				color: 'purple.700',
				padding: '28px 40px 28px 40px',
				fontSize: 'lg',
				fontWeight: 'regular',

				_placeholder: {
					color: 'purple.200',
				},
			},
		},

		mobileForm: {
			field: {
				height: '52px',
				width: '100%',
				borderRadius: 'inputRadius.lg',
				bg: 'white',
				color: 'purple.700',
				padding: '18px 24px 18px 24px',
				fontSize: 'sm',
				fontWeight: 'regular',

				_placeholder: {
					color: 'purple.200',
				},
			},
		},

		profile: {
			field: {
				height: '400px',
				width: '600px',
				borderRadius: 'inputRadius.md',
				bg: 'purple.400',
				borderColor: 'purple.200',
				border: '2px dashed',
				color: 'purple.200',
			},
		},

		profileMobile: {
			field: {
				height: '270px',
				width: '270px',
				borderRadius: 'inputRadius.md',
				bg: 'purple.400',
				borderColor: 'purple.200',
				border: '2px dashed',
				color: 'purple.200',
			},
		},
	},
});

export default Input;
