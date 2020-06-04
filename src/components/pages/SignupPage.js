import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
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
import validateEmail from "../../utils/validateEmail";
import validatePassword from "../../utils/validatePassword";
import firebase from "../../auth/firebase";
import {
	withFirebaseContext,
	FirebaseContext,
} from "../../auth/FirebaseAuthProvider";

import axios from "axios";

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
	progress: {
		position: "absolute",
	},
	submitButton: {
		margin: theme.spacing(3, 0, 2),
		height: "100%",
	},
}));

const SignupPage = (props) => {
	const classes = useStyles();
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	// for the submission
	const [errors, setErrors] = useState({});

	const isValidInput = () => {
		let invalid = true;
		let currentErrors = { ...errors };

		if (password !== "" && !validatePassword(password)) {
			currentErrors = {
				...currentErrors,
				password:
					"Please ensure that your password is 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter",
			};
			invalid = false;
		} else {
			const { password, ...rest } = currentErrors;
			currentErrors = { ...rest };
		}

		if (email !== "" && !validateEmail(email)) {
			currentErrors = {
				...currentErrors,
				email: "Please enter a valid email address",
			};
			invalid = false;
		} else {
			// remove the email error if possible
			const { email, ...rest } = currentErrors;
			currentErrors = { ...rest };
		}
		setErrors(currentErrors);
		return invalid;
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!isValidInput()) {
			return;
		}
		setLoading(true);

		// user is signed in automatically
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((user) => {
				console.log(user);
				console.log("Succesful signup");
				setLoading(false);

				// should be available now
				history.push("/");
			})
			.catch((err) => {
				console.log(err);
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
						New Account
					</Typography>
					<FormControl>
						<TextField
							className={classes.margin}
							label='E-mail'
							value={email}
							onChange={handleEmailChange}
							helperText={errors.email}
							error={!!errors.email}
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
							helperText={errors.password}
							error={!!errors.password}
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
								"Sign Up"
							)}
						</Button>
					</FormControl>
				</Paper>
			</Grid>
			{errors.message && (
				<Typography variant='body2' className={classes.customError}>
					{errors.message}
				</Typography>
			)}
		</Container>
	);
};

export default withFirebaseContext(SignupPage);
