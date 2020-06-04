import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

let theme = createMuiTheme({
	typography: {
		h1: {
			fontSize: "3rem",
		},
	},
});

theme = responsiveFontSizes(theme);

export default theme;
