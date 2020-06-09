import React, { useState, forwardRef, useEffect } from "react";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const tableIcons = {
	Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
	Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
	Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
	DetailPanel: forwardRef((props, ref) => (
		<ChevronRight {...props} ref={ref} />
	)),
	Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
	Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
	Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => (
		<ChevronLeft {...props} ref={ref} />
	)),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
	ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
	ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const WatchlistTable = (props) => {
	const { watchlist, onDeleteWatchlistItem } = props;
	const [openDelete, setOpenDelete] = useState(false);
	const [selectedItemId, setSelectedItemId] = useState("");
	const [loading, setLoading] = useState(false);

	const columns = [
		{ title: "Tag Name", field: "tagName" },
		{ title: "Watchlist Url", field: "url" },
	];

	const handleDelete = (event, rowData) => {
		const { id } = rowData;
		setSelectedItemId(id);
		setOpenDelete(true);
	};

	const handleDeleteClose = () => {
		setSelectedItemId("");
		setOpenDelete(false);
	};

	const handleDeleteConfirm = () => {
		onDeleteWatchlistItem(selectedItemId);
		setOpenDelete(false);
	};

	return (
		<>
			<MaterialTable
				title='Your Watchlist'
				columns={columns}
				data={watchlist}
				icons={tableIcons}
				actions={[
					{
						icon: tableIcons.Delete,
						tooltip: "Delete item",
						onClick: (event, rowData) => {
							handleDelete(event, rowData);
						},
					},
				]}
			/>
			<Dialog open={openDelete} onClose={handleDeleteClose}>
				<DialogTitle>Delete watchlist item?</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Are you sure you want to delete this watchlist item? All listings
						connected to this will also be deleted.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDeleteClose} color='primary'>
						No
					</Button>
					<Button onClick={handleDeleteConfirm} color='primary' autoFocus>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default WatchlistTable;
