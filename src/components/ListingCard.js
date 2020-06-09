import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		margin: theme.spacing(3),
	},
	url: {
		textOverflow: "ellipsis",
		maxWidth: "20ch",
		whiteSpace: "nowrap",
		overflow: "hidden",
	},
	title: {
		textOverflow: "ellipsis",
		maxWidth: "40ch",
		whiteSpace: "nowrap",
		overflow: "hidden",
	},
	details: {
		display: "flex",
		flexDirection: "column",
	},
	image: {
		objectFit: "cover",
		width: "100px",
	},
}));

const ListingCard = ({ listing }) => {
	const classes = useStyles();
	const {
		location,
		title,
		price,
		directUrl,
		postedAt,
		imageUrl,
		details,
		description,
	} = listing;

	const displayPrice = price.match(/\$\S*/)
		? price.match(/\$\S*/)[0]
		: "Unknown Price";

	const convertDate = (seconds) => {
		const date = new Date(seconds * 1000);

		let monthNames = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];

		let day = date.getDate();

		let monthIndex = date.getMonth();
		let monthName = monthNames[monthIndex];

		let year = date.getFullYear();
		return `${day}-${monthName}-${year}`;
	};

	return (
		<Card className={classes.root}>
			<img src={imageUrl} title='Listing Image' className={classes.image} />
			<div className={classes.details}>
				<CardContent className={classes.content}>
					<Typography component='h6' variant='h6' className={classes.title}>
						{title}
					</Typography>
					<Typography className={classes.title}>
						{`${displayPrice} ${location} ${convertDate(postedAt.seconds)}`}
					</Typography>
					<Typography
						variant='span'
						color='textSecondary'
						className={classes.url}
					>
						<a href={directUrl}>{directUrl}</a>
					</Typography>
					{/* <Typography variant='p' color='textSecondary'>
						{description}
					</Typography> */}
				</CardContent>
			</div>
		</Card>
	);
};

export default ListingCard;
