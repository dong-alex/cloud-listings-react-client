import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export const mainListItems = (
	<>
		<ListItem button>
			<ListItemIcon>
				<DashboardIcon />
			</ListItemIcon>
			<ListItemText primary='Dashboard' />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<TrackChangesIcon />
			</ListItemIcon>
			<ListItemText primary='Watchlist' />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<NotificationsIcon />
			</ListItemIcon>
			<ListItemText primary='Notifications' />
		</ListItem>
	</>
);

export const secondaryListItems = (
	<>
		<ListItem button>
			<ListItemIcon>
				<AccountCircleIcon />
			</ListItemIcon>
			<ListItemText primary='Account Settings' />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<ExitToAppIcon />
			</ListItemIcon>
			<ListItemText primary='Log out' />
		</ListItem>
	</>
);
