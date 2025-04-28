import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const helpers = createMultiStyleConfigHelpers(['container', 'body', 'footer']);

const defaultProps = {
	size: 'md',
};

const Card = helpers.defineMultiStyleConfig({
	defaultProps,
	baseStyle: {
		container: {
			width: '100%',
			maxW: '240px',
			height: '374px',
			bg: 'white',
			borderRadius: 'cardRadius.lg',
			overflow: 'hidden',
			cursor: 'pointer',
		},
		body: {
			width: '100%',
			maxW: '240px',
			height: '300px',
			padding: '0px',
		},
		footer: {
			flexDirection: 'column',
			padding: '18px 0px 13px 18px',
			color: 'purple.400',
		},
	},

	variants: {
		mobile: {
			container: {
				width: '100%',
				maxW: '342px',
				height: '480px',
				bg: 'white',
				borderRadius: 'cardRadius.sm',
				overflow: 'hidden',
				cursor: 'pointer',
			},
			body: {
				width: '100%',
				maxW: '342px',
				height: '428px',
				padding: '0px',
			},
			footer: {
				flexDirection: 'row',
				justifyContent: 'space-between',
				padding: '16px 0px 16px 21px',
				color: 'purple.400',
			},
		},

		picker: {
			container: {
				width: '100%',
				maxW: '200px',
				height: '320px',
				bg: 'white',
				borderRadius: 'cardRadius.sm',
				overflow: 'hidden',
				cursor: 'pointer',
			},
			body: {
				width: '100%',
				maxW: '200px',
				height: '240px',
				padding: '0px',
			},
			footer: {
				display: 'block',
				color: 'purple.400',
				padding: '10px',
				fontSize: 'md',
			},
		},

		pickerMobile: {
			container: {
				width: '100%',
				maxW: '240px',
				height: '260px',
				bg: 'white',
				borderRadius: 'cardRadius.sm',
				overflow: 'hidden',
				cursor: 'pointer',
			},
			body: {
				width: '100%',
				maxW: '240px',
				height: '200px',
				padding: '0px',
			},
			footer: {
				display: 'block',
				color: 'purple.400',
				padding: '10px',
				fontSize: 'xs',
			},
		},
	},
});

export default Card;
