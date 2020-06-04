import React, { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Container from "@material-ui/core/Container";
import firebase from "../auth/firebase";
import theme from "./theme";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: "none",
		[theme.breakpoints.up("sm")]: {
			backgroundColor: theme.palette.paper,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-end",
			padding: "0 8px",
			...theme.mixins.toolbar,
		},
	},
	drawerPaper: {
		position: "absolute",
		whiteSpace: "nowrap",
		height: "100vh",
		width: theme.spacing(7),

		[theme.breakpoints.up("sm")]: {
			width: drawerWidth,
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
	},
	drawerPaperClose: {
		overflowX: "hidden",
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9),
		},
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: "100vh",
		overflow: "auto",
	},
	navigation: {
		height: "100vh",
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
	},
	fixedHeight: {
		height: 240,
	},
	container: {
		marginLeft: theme.spacing(9),
		[theme.breakpoints.up("sm")]: {
			transition: theme.transitions.create(["width", "margin"], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
		},
	},
	containerShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		[theme.breakpoints.up("sm")]: {
			transition: theme.transitions.create(["width", "margin"], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
	},
	bottomList: {
		marginTop: "auto",
	},
}));

const NavigationDrawer = ({ children }) => {
	const classes = useStyles();
	const [open, setOpen] = useState(true);

	const handleDrawerOpenClose = () => {
		setOpen(!open);
	};

	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	return (
		<div>
			<Drawer
				variant='permanent'
				classes={{
					paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
				}}
				open={open}
			>
				<div className={classes.toolbarIcon}>
					<IconButton onClick={handleDrawerOpenClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem button component={Link} to='/'>
						<ListItemIcon>
							<DashboardIcon />
						</ListItemIcon>
						<ListItemText primary='Dashboard' />
					</ListItem>
					<ListItem button component={Link} to='/watchlist'>
						<ListItemIcon>
							<TrackChangesIcon />
						</ListItemIcon>
						<ListItemText primary='Watchlist' />
					</ListItem>
					<ListItem button component={Link} to='/notifications'>
						<ListItemIcon>
							<NotificationsIcon />
						</ListItemIcon>
						<ListItemText primary='Notifications' />
					</ListItem>
				</List>
				<Divider />
				<List className={classes.bottomList}>
					<ListItem button component={Link} to='/settings'>
						<ListItemIcon>
							<AccountCircleIcon />
						</ListItemIcon>
						<ListItemText primary='Account Settings' />
					</ListItem>
					<ListItem button onClick={() => firebase.auth().signOut()}>
						<ListItemIcon>
							<ExitToAppIcon />
						</ListItemIcon>
						<ListItemText primary='Log out' />
					</ListItem>
				</List>
			</Drawer>
			<ThemeProvider theme={theme}>
				<Container
					className={clsx(classes.container, open && classes.containerShift)}
				>
					{children}
				</Container>
			</ThemeProvider>
		</div>
	);
};

export default NavigationDrawer;
