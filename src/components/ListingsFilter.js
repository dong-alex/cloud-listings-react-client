import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	formControl: {
		margin: theme.spacing(3),
	},
	group: {
		display: "flex",
		flexDirection: "row",
	},
	loadingBar: {
		height: theme.spacing(2),
		marginTop: theme.spacing(7),
	},
}));

const ListingsFilter = ({ watchlist, onFilterChange, loading }) => {
	const classes = useStyles();
	const [currentFilter, setCurrentFilter] = useState("");

	const handleFilterChange = (event) => {
		setCurrentFilter(event.target.name);
	};

	return loading ? (
		<LinearProgress className={classes.loadingBar} />
	) : (
		<FormControl component='fieldset' className={classes.formControl}>
			<FormLabel component='legend'>Your tags</FormLabel>
			<FormGroup className={classes.group}>
				<FormControlLabel
					control={
						<Checkbox
							checked={currentFilter === ""}
							onChange={handleFilterChange}
							name=''
						/>
					}
					label='None'
				/>
				{watchlist.map(({ tagName, id }) => (
					<FormControlLabel
						key={id}
						control={
							<Checkbox
								checked={currentFilter === tagName}
								onChange={handleFilterChange}
								name={tagName}
							/>
						}
						label={tagName}
					/>
				))}
			</FormGroup>
			<FormHelperText>Filter your listings</FormHelperText>
		</FormControl>
	);
};

export default ListingsFilter;
