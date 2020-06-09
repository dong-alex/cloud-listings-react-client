import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import ListingCard from "./ListingCard";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			marginTop: theme.spacing(2),
		},
	},
}));

const ListingsDisplay = ({ listings, loading }) => {
	const classes = useStyles();
	const [numPages, setNumPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentListings, setCurrentListings] = useState(listings);

	useEffect(() => {
		console.log(currentListings);
		console.log(listings);
	}, [currentListings]);

	useEffect(() => {
		setCurrentListings(
			listings.slice((currentPage - 1) * 9, currentPage - 1 + 9)
		);
		setNumPages(Math.floor(listings.length / 9));
	}, [listings]);

	useEffect(() => {
		setCurrentListings(
			listings.slice((currentPage - 1) * 9, (currentPage - 1) * 9 + 9)
		);
	}, [currentPage]);

	const handlePageChange = (event, pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<>
			{numPages > 0 && (
				<>
					<Grid container>
						{currentListings.map((listing) => (
							<Grid item xs={6}>
								<ListingCard listing={listing} />
							</Grid>
						))}
					</Grid>
					<Pagination count={numPages} onChange={handlePageChange} />
				</>
			)}
			<div>There are no listings - Go to your watchlist to create one!</div>
		</>
	);
};

export default ListingsDisplay;
