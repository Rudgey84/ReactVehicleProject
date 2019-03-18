import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import VehicleDialog from './VehicleDialog';
import { getVehicles } from '../actions/vehicles';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/StarBorder';

const styles = theme => ({
	'@global': {
		body: {
			backgroundColor: theme.palette.common.white,
		},
	},
	appBar: {
		position: 'relative',
		backgroundColor: theme.palette.common.black,
	},
	toolbarTitle: {
		flex: 1,
		color: theme.palette.common.white,
	},
	layout: {
		width: 'auto',
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
			width: 900,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	heroContent: {
		maxWidth: 700,
		margin: '0 auto',
		padding: `${theme.spacing.unit * 6}px 0 ${theme.spacing.unit * 4}px`,
	},
	heroTitle: {
		borderBottom: '4px solid black',
		borderTop: '2px solid black',
		padding: 40,
		fontSize: '2em'
	},
	cardHeader: {
		backgroundColor: theme.palette.common.black,
	},
	title: {
		color: theme.palette.common.white,
	},
	subHeader: {
		color: '#777',
	},
	cardPricing: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'baseline',
		marginBottom: theme.spacing.unit * 2,
	},
	cardActions: {
		[theme.breakpoints.up('sm')]: {
			paddingBottom: theme.spacing.unit * 2,
		},
	},
	footer: {
		marginTop: theme.spacing.unit * 8,
		borderTop: `1px solid ${theme.palette.divider}`,
		padding: `${theme.spacing.unit * 6}px 0`,
	},
	media: {
		height: 140,
	},
});

const footers = [
	{
		title: 'Company',
		description: ['Team', 'History', 'Contact us', 'Locations'],
	},
	{
		title: 'Features',
		description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
	},
	{
		title: 'Resources',
		description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
	},
	{
		title: 'Legal',
		description: ['Privacy policy', 'Terms of use'],
	},
];

const YEAR = {
	'k16': "2016",
	'k17': "2017",
	'k18': "2018"
}

class VehicleList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			vehicles: null,
			open: false
		};
		this.handleDialog = this.handleDialog.bind(this);
	}

	handleDialog = id => () => {

		this.setState({
			open: !this.state.open,
			modelId: id
		});
	};

	componentDidMount() {
		this.props.getVehicles();
	}

	render() {

		const { vehicles } = this.props.vehicles;
		const { classes } = this.props;

		return <React.Fragment>
			<CssBaseline />
			<AppBar position="static" color="default" className={classes.appBar}>
				<Toolbar>
					<Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
						Jaguar
				 	</Typography>
				</Toolbar>
			</AppBar>
			<main className={classes.layout}>
				<div className={classes.heroContent}>
					<Typography className={classes.heroTitle} component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
						CURRENT VEHICLES
				 </Typography>
					<Typography variant="h6" align="center" color="textSecondary" component="p">
						The new Jaguar XE delivers an enhanced exterior design, all-new luxurious interior and advanced technologies, including a segment-first ClearSight rear view mirror, utilising a wide-angle rear facing camera.
				 </Typography>
				</div>
				{/* End hero unit */}
				<Grid container spacing={40} alignItems="flex-end">
					{vehicles !== undefined ? vehicles.map(model => (
						// Enterprise card is full width at sm breakpoint
						<React.Fragment>
							<Grid item key={model.id} xs={12} sm={model.id === 'Enterprise' ? 12 : 6} md={4}>
								<Card>
									<CardHeader
										title={`${model.media[0].name.toUpperCase()}`}
										subheader={YEAR[model.modelYear]}
										titleTypographyProps={{ align: 'center' }}
										subheaderTypographyProps={{ align: 'center' }}
										action={model.id === 'xf' ? <StarIcon style={{ 'color': 'white' }} /> : null}
										classes={{ title: classes.title, subheader: classes.subHeader }}
										className={classes.cardHeader}
									/>
									<CardMedia
										className={classes.media}
										image={model.media[0].url}
										title={`Jaguar ${model.media[0].name.toUpperCase()}`}
									/>
									<CardActions className={classes.cardActions}>
										<Button fullWidth onClick={this.handleDialog(model.id)}>
											FIND OUT MORE
										</Button>
									</CardActions>
								</Card>
							</Grid>
						</React.Fragment>
					))
						:
						null
					}

					<VehicleDialog
						key={this.state.modelId}
						onClose={this.handleDialog}
						open={this.state.open}
						id={this.state.modelId}
					/>

				</Grid>
			</main>
			{/* Footer */}
			<footer className={classNames(classes.footer, classes.layout)}>
				<Grid container spacing={32} justify="space-evenly">
					{footers.map(footer => (
						<Grid item xs key={footer.title}>
							<Typography variant="h6" color="textPrimary" gutterBottom>
								{footer.title}
							</Typography>
							{footer.description.map(item => (
								<Typography key={item} variant="subtitle1" color="textSecondary">
									{item}
								</Typography>
							))}
						</Grid>
					))}
				</Grid>
			</footer>
			{/* End footer */}
		</React.Fragment>

	}
}

VehicleList.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({
	thevehicles
}) => {
	const {
		loader,
		vehicles,
		vehiclesError
	} = thevehicles;
	return { loader, vehicles, vehiclesError };
};

export default _.flow(withStyles(styles),
	connect(mapStateToProps, { getVehicles })
)(VehicleList);