import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import FormControl from "@material-ui/core/FormControl";
import CircularProgress from "@material-ui/core/CircularProgress";
import { firebase } from "../../auth/firebase";
import { FirebaseContext } from "../../auth/FirebaseAuthProvider";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		marginBottom: theme.spacing(2),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%",
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	margin: {
		margin: theme.spacing(1),
	},
	customError: {
		color: "red",
		fontSize: "0.8rem",
		marginTop: 10,
	},
	progess: {
		position: "absolute",
	},
	submitButton: {
		margin: theme.spacing(3, 0, 2),
		height: "100%",
	},
}));

const LoginPage = (props) => {
	const classes = useStyles();
	const history = useHistory();
	const { authenticated } = useContext(FirebaseContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	// for the submission
	const [errors, setError] = useState("");
	const handleSubmit = (event) => {
		event.preventDefault();
		setLoading(true);

		return firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((user) => {
				setLoading(false);
				history.push("/");
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	return (
		<Container maxWidth='xs'>
			<Grid>
				<CssBaseline />
				<Paper elevation={0} className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Login
					</Typography>
					<FormControl>
						<TextField
							className={classes.margin}
							label='E-mail'
							value={email}
							onChange={handleEmailChange}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<EmailIcon />
									</InputAdornment>
								),
							}}
						/>
						<TextField
							className={classes.margin}
							label='Password'
							type='password'
							value={password}
							onChange={handlePasswordChange}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<LockIcon />
									</InputAdornment>
								),
							}}
						/>
						<Button
							type='submit'
							variant='contained'
							color='primary'
							disabled={loading || !email || !password}
							className={classes.submitButton}
							onClick={handleSubmit}
						>
							{loading ? (
								<CircularProgress size={30} className={classes.progess} />
							) : (
								"Sign In"
							)}
						</Button>
					</FormControl>
				</Paper>
			</Grid>
			<Grid container>
				<Grid item>
					<Link href='signup' variant='body2'>
						Don't have an account? Sign Up
					</Link>
				</Grid>
			</Grid>
			{errors.message && (
				<Typography variant='body2' className={classes.customError}>
					{errors.message}
				</Typography>
			)}
		</Container>
	);
};

export default LoginPage;
