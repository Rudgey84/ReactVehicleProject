import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { getVehicleData } from '../actions/vehicleData';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	upperCase: {
		textTransform: 'uppercase',
	},
	dBlock: {
		display: 'block',
		fontWeight: 700
	}
});

class VehicleDialog extends Component {

	constructor(props) {
		super(props);
	}

	onEntering = () => {
		const { id } = this.props;
		this.props.getVehicleData(id);
	}

	render() {

		const { open, id, onClose, vehicleData, classes } = this.props;

		return (
			<React.Fragment>
				<Dialog
					onEntering={this.onEntering}
					onBackdropClick={onClose(id)}
					aria-labelledby="customized-dialog-title"
					open={open}
					maxWidth={'sm'}
					fullWidth
				>
				
					<React.Fragment>
					<DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
						<span className={classes.upperCase}>Jaguar {vehicleData.id}</span> <Chip label={vehicleData.price} variant="outlined" />
					</DialogTitle>
					<DialogContent>
						<Typography gutterBottom>
							{vehicleData.description}
						</Typography>
						<Grid container spacing={24}>
							<Grid item xs={12} sm={6}>
							<Typography gutterBottom className={classes.upperCase}>Passengers: <span className={classes.dBlock}>{vehicleData && vehicleData.meta.passengers}</span></Typography>
							<Typography gutterBottom className={classes.upperCase}>Trim(s): {vehicleData && vehicleData.meta.bodystyles.map(b => <span className={classes.dBlock}>{b}</span>)}</Typography>
							</Grid>
							<Grid item xs={12} sm={6}>
							<Typography gutterBottom className={classes.upperCase}>Transmission(s): {vehicleData && vehicleData.meta.drivetrain.map(d => <span className={classes.dBlock}>{d}</span>)}</Typography>
							<Typography gutterBottom className={classes.upperCase}>{vehicleData && vehicleData.meta.emissions.template}: <span className={classes.dBlock}>{vehicleData && vehicleData.meta.emissions.value}</span></Typography>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button onClick={onClose(id)} color="primary">
							Close
				  </Button>
					</DialogActions>
					</React.Fragment>

				</Dialog>
			</React.Fragment>
		);
	}
}

VehicleDialog.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({
	vehicledata
}) => {
	const {
		loader,
		vehicleData,
		vehicleDataError
	} = vehicledata;
	return { loader, vehicleData, vehicleDataError };
};

export default _.flow(withStyles(styles),
	connect(mapStateToProps, { getVehicleData })
)(VehicleDialog);