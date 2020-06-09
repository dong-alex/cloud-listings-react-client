import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import NavigationLayout from "../NavigationLayout";
import ListingsFilter from "../ListingsFilter";
import ListingsDisplay from "../ListingsDisplay";
import useListings from "../hooks/useListings";
import useWatchlist from "../hooks/useWatchlist";

const useStyles = makeStyles((theme) => ({
	header: {
		textAlign: "center",
		marginBottom: theme.spacing(4),
	},
	divider: {
		marginBottom: theme.spacing(4),
	},
	placeholder: {
		marginTop: theme.spacing(5),
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "400px",
	},
	placeholderText: {
		marginLeft: theme.spacing(4),
		marginRight: theme.spacing(4),
	},
}));

const DashboardPage = (props) => {
	const classes = useStyles();
	const { listings, loading } = useListings();
	const { watchlist } = useWatchlist();

	return (
		<NavigationLayout>
			<Grid>
				<Typography variant='h1' component='h2' className={classes.header}>
					Dashboard
				</Typography>
				<Divider variant='middle' className={classes.divider} />{" "}
				<Typography variant='h5' component='h6' className={classes.subheader}>
					Your Listings
				</Typography>
				{watchlist.length > 0 && listings.length > 0 ? (
					<>
						<ListingsFilter watchlist={watchlist} loading={loading} />
						<ListingsDisplay listings={listings} />
					</>
				) : (
					<Paper className={classes.placeholder}>
						<h2 className={classes.placeholderText}>
							There are no listings right now! - Your watchlist is currently
							fetching or there are no results.
						</h2>
					</Paper>
				)}
			</Grid>
		</NavigationLayout>
	);
};

export default DashboardPage;
