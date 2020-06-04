import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NavigationLayout from "../NavigationLayout";

const useStyles = makeStyles((theme) => ({
	header: {
		textAlign: "center",
	},
}));

const WatchlistPage = (props) => {
	const classes = useStyles();

	return (
		<NavigationLayout>
			<Typography variant='h1' component='h2' className={classes.header}>
				Watchlist
			</Typography>
		</NavigationLayout>
	);
};

export default WatchlistPage;
