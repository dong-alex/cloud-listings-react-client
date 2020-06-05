import React, { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
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
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { firebase } from "../auth/firebase";
import theme from "./theme";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
	root: {},
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
		flexShrink: 0,
		whiteSpace: "nowrap",
		minHeight: "100%",
		width: theme.spacing(7),
		overflowX: "hidden",
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
	container: {
		marginLeft: theme.spacing(9),
		marginRight: theme.spacing(0),
		width: "auto",
		height: "auto",
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		[theme.breakpoints.up("sm")]: {},
	},
	containerShift: {
		marginLeft: (props) => (props.open ? theme.spacing(9) : drawerWidth),
		[theme.breakpoints.up("sm")]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: (props) => (props.open ? drawerWidth : theme.spacing(9)),
		},
	},
	bottomList: {
		marginTop: "auto",
	},
}));

const NavigationDrawer = ({ children }) => {
	const [open, setOpen] = useState(false);
	const classes = useStyles({ open });

	const handleDrawerOpenClose = () => {
		setOpen(!open);
	};

	return (
		<>
			<Drawer
				variant='permanent'
				classes={{
					paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
				}}
				anchor='left'
				open={open}
			>
				<div className={classes.toolbarIcon}>
					<IconButton onClick={handleDrawerOpenClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem button component={Link} to='/notifications'>
						<ListItemIcon>
							<NotificationsIcon />
						</ListItemIcon>
						<ListItemText primary='Notifications' />
					</ListItem>
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
		</>
	);
};

export default NavigationDrawer;
