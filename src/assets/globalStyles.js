import { createGlobalStyle } from 'styled-components';

export const fontFamily =
  "'Poppins', -apple-system, BlinkMacSystemFont, 'avenir next', avenir, 'helvetica neue', 'segoe ui', helvetica, roboto, noto, arial, sans-serif";

export const fontFamilyTitle = `'Amatic SC', ${fontFamily}`;
export const fontFamilyNames = `'Hello Beautiful', ${fontFamilyTitle}`;

export const breakpoints = {
  desktopLarge: `(min-width: 1701px)`,
  desktop: `(max-width: 1700px)`,
  desktopSmall: `(max-width: 1400px)`,
  desktopExtraSmall: `(max-width: 1200px)`,
  tablet: `(max-width: 1024px)`,
  tabletSmall: `(max-width: 900px)`,
  mobile: `(max-width: 767px)`,
  mobileSmall: `(max-width: 400px)`,
};

export const GlobalStyles = createGlobalStyle`
	// Hello Beautiful font-face
	@font-face {
		font-family: "Hello Beautiful";
		src:  url("/fonts/hello-beautiful.eot");
		src:  url("/fonts/hello-beautiful.eot?#iefix") format("embedded-opentype"),
					url("/fonts/hello-beautiful.woff2") format("woff2"),
					url("/fonts/hello-beautiful.woff") format("woff"),
					url("/fonts/hello-beautiful.ttf") format("truetype"),
					url("/fonts/hello-beautiful.svg#Hello Beautiful") format("svg");
	}

	// css reset
	html, body, div, span, applet, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var,
	b, u, i, center,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed, 
	figure, figcaption, footer, header, hgroup, 
	menu, nav, output, ruby, section, summary,
	time, mark, audio, video {
		margin: 0;
		padding: 0;
		border: 0;
		vertical-align: baseline;
	}

	article, aside, details, figcaption, figure, 
	footer, header, hgroup, menu, nav, section {
		display: block;
	}
	body {
		line-height: 1.3;
	}
	ol, ul {
		list-style: none;
	}
	blockquote, q {
		quotes: none;
	}
	blockquote:before, blockquote:after,
	q:before, q:after {
		content: '';
		content: none;
	}
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}
	* {
		box-sizing: border-box;
		:focus{
			outline: none;
		}
	}

	/* global styles */
	html,
	body {
		overflow-x: hidden;
		background-color: ${(props) => props.theme.bg};
	}

	* {
		box-sizing: border-box;
		touch-action: auto;
		font-family: ${fontFamily};
		font-size: 18px;
		color: ${(props) => props.theme.text};
		@media ${breakpoints.tabletSmall} {
			font-size: 16px;
		}
	}
`;
