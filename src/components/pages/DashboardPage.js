import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import NavigationLayout from "../NavigationLayout";

const useStyles = makeStyles((theme) => ({
	header: {
		textAlign: "center",
		marginBottom: theme.spacing(4),
	},
}));

const DashboardPage = (props) => {
	const classes = useStyles();

	return (
		<NavigationLayout>
			<Grid>
				<Typography variant='h1' component='h2' className={classes.header}>
					Dashboard
				</Typography>
			</Grid>
		</NavigationLayout>
	);
};

export default DashboardPage;
