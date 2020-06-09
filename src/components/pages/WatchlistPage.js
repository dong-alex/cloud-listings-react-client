import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import useWatchlist from "../hooks/useWatchlist";
import NavigationLayout from "../NavigationLayout";
import MuiAlert from "@material-ui/lab/Alert";
import WatchlistTable from "../WatchlistTable";

const Alert = (props) => {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
};

const useStyles = makeStyles((theme) => ({
	header: {
		textAlign: "center",
		marginBottom: theme.spacing(4),
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	alertMessage: {
		marginTop: theme.spacing(2),
	},
	divider: {
		marginBottom: theme.spacing(4),
	},
	addWatchlistPanel: {
		// flexGrow: 1,
	},
	container: {
		display: "flex",
		flexDirection: "column",
	},
	submitButton: {
		height: "100%",
		marginTop: theme.spacing(2),
	},
}));

const WatchlistPage = (props) => {
	const classes = useStyles();
	const {
		watchlist,
		onAddWatchlistItem,
		onDeleteWatchlistItem,
	} = useWatchlist();
	const [loading, setLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [formState, setFormState] = useState({
		tagName: "",
		url: "",
	});

	useEffect(() => {
		console.log("We got a watchlist from the custom hook", watchlist);
	}, [watchlist]);

	const handleChange = (event) => {
		setFormState({
			...formState,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const { tagName, url } = formState;
		setLoading(true);
		try {
			await onAddWatchlistItem(tagName, url);
			setLoading(false);
			setSuccessMessage("Successfully added", url, "into your watchlist");
			return;
		} catch (err) {
			setLoading(false);
			setErrorMessage(err.message);
			return;
		}
	};

	return (
		<NavigationLayout>
			<Typography variant='h1' component='h2' className={classes.header}>
				Watchlist
			</Typography>
			<Divider variant='middle' className={classes.divider} />
			<Typography variant='h5' component='h6'>
				Add to Watchlist
			</Typography>
			{errorMessage && (
				<Alert
					severity='error'
					className={classes.alertMessage}
					action={
						<IconButton
							color='inherit'
							size='small'
							onClick={() => {
								setErrorMessage("");
							}}
						>
							<CloseIcon fontSize='inherit' />
						</IconButton>
					}
				>
					{errorMessage}
				</Alert>
			)}
			{successMessage && (
				<Alert
					severity='success'
					className={classes.alertMessage}
					action={
						<IconButton
							color='inherit'
							size='small'
							onClick={() => {
								setSuccessMessage("");
							}}
						>
							<CloseIcon fontSize='inherit' />
						</IconButton>
					}
				>
					{successMessage}
				</Alert>
			)}
			<form className={classes.container} noValidate autoComplete='off'>
				<TextField
					label='Tag name'
					placeholder='Honda Civic'
					helperText='Track your listing with a tag'
					name='tagName'
					value={formState.tagName}
					onChange={handleChange}
					margin='normal'
				/>
				<TextField
					label='Kijiji Car Listing Url'
					placeholder='https://kijiji.com/...'
					helperText='Enter the full url to track the front page'
					name='url'
					value={formState.url}
					onChange={handleChange}
					margin='normal'
				/>
				<Button
					type='submit'
					variant='contained'
					color='primary'
					onClick={handleSubmit}
					className={classes.submitButton}
				>
					{loading ? <CircularProgress /> : "Add"}
				</Button>
			</form>
			<Divider variant='middle' className={classes.divider} />
			<WatchlistTable
				watchlist={watchlist}
				onDeleteWatchlistItem={onDeleteWatchlistItem}
			/>
		</NavigationLayout>
	);
};

export default WatchlistPage;
