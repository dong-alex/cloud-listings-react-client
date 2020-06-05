import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NavigationLayout from "../NavigationLayout";

const useStyles = makeStyles((theme) => ({
	header: {
		textAlign: "center",
		marginBottom: theme.spacing(4),
	},
}));

const NotificationPage = (props) => {
	const classes = useStyles();

	return (
		<NavigationLayout>
			<Typography variant='h1' component='h2' className={classes.header}>
				Notifications
			</Typography>
		</NavigationLayout>
	);
};

export default NotificationPage;
