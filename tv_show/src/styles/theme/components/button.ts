import { defineStyleConfig } from '@chakra-ui/react';

const Button = defineStyleConfig({
	baseStyle: {
		borderRadius: 'buttonRadius',
		fontWeight: 'lightBold',
		width: '140px',
	},

	variants: {
		solid: {
			bg: 'purple.700',
			color: 'white',
			fontSize: 'xl',
			padding: '8px 12px 8px 12px',
			height: '44px',

			_hover: {
				bg: 'purple.400',
			},
		},

		hamburger: {
			bg: 'purple.700',
			color: 'white',
			fontSize: 'xl',
			padding: '0px 0px 0px 0px',
			height: '24px',
			width: '10px',
		},

		postForm: {
			bg: 'white',
			color: 'purple.400',
			fontSize: 'xs',
			width: '144px',
			height: '52px',
			padding: '18px 52px 18px 52px',

			_disabled: {
				_hover: {
					bg: 'white',
				},
			},
		},

		mobilePostForm: {
			bg: 'white',
			color: 'purple.400',
			fontSize: 'xs',
			width: '96px',
			height: '38px',
			padding: '12px 28px 12px 28px',

			_disabled: {
				_hover: {
					bg: 'white',
				},
			},
		},

		logout: {
			bg: 'purple.700',
			color: 'white',
			fontSize: 'xl',
			padding: '0px 22px 0px 0px',
			width: '90px',
			height: '16px',
			ml: '24px',
		},

		menu: {
			bg: 'purple.400',
			color: 'white',
			fontSize: 'xl',
			padding: '10px 10px 10px 10px',
			height: '24px',
			width: '24px',
		},

		menuItem: {
			bg: 'white',
			color: 'purple.400',
			fontSize: 'xs',
			padding: '0px 0px 0px 0px',
			height: '14px',
			width: '54px',
			justifyContent: 'flex-start',
		},

		modal: {
			bg: 'purple.700',
			color: 'white',
			fontSize: 'xl',
			padding: '8px 12px 8px 12px',
			height: '44px',
			width: '200px',

			_hover: {
				bg: 'purple.400',
			},
		},

		mobileModal: {
			bg: 'purple.700',
			color: 'white',
			fontSize: 'xs',
			padding: '8px 12px 8px 12px',
			height: '26px',

			_hover: {
				bg: 'purple.400',
			},
		},
	},
});

export default Button;
