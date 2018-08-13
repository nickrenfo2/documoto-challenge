import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import {Button, Drawer, List, ListItem, ListItemText, ListItemIcon, AppBar, Toolbar, Typography, Divider} from '@material-ui/core';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import LocaleMenu from './LocaleMenu';

class MainMenu extends Component {
	constructor(){
		super();
		let isOpen = (window.innerWidth > 600);//if the page is mobile, start with the menu closed
		this.state = {
			open:isOpen,
			pages:null,
		}
	}

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { classes, locale } = this.props;
		const {pages} = this.state;

		return (
			<div className={classes.root}>
				<AppBar
					position="absolute"
					className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
				>
					<Toolbar disableGutters={!this.state.open}>
						<Button
							variant="raised"
							// color="primary"
							onClick={this.handleDrawerOpen}
							className={classNames(classes.menuButton, this.state.open && classes.hide)}
						>
							<FontAwesomeIcon icon="chevron-right"/>
						</Button>

						<Typography variant="title" color="inherit" noWrap>
							Documoto Code Challenge
						</Typography>
					</Toolbar>
				</AppBar>

				<Drawer
					variant="permanent"
					classes={{
						paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
					}}
					open={this.state.open}
				>
					<div className={classes.toolbar}>



						<Button variant="raised" color="primary" onClick={this.handleDrawerClose}>
						<FontAwesomeIcon icon="chevron-left"/>
						</Button>
					</div>
					<Divider/>
					<List>
						<LocaleMenu setLocale={this.props.setLocale} locale={locale}/>
						<Divider/>
						<ListItem button onClick={this.navigateTo.bind(this,'/pagelist')}>
							<ListItemIcon>
								<FontAwesomeIcon icon='list' fixedWidth/>
							</ListItemIcon>
							<ListItemText primary="Page List" style={{paddingLeft:'20px'}}/>
						</ListItem>

						<Divider />

						{
							pages === null &&
								<FontAwesomeIcon icon="spinner" spin/>
						}
						{
							pages && pages.map((page, ind) => {
								return (
									<ListItem key={ind} button onClick={this.navigateTo.bind(this,'/page/'+page.id)}>
										<ListItemIcon>
											<FontAwesomeIcon icon='cog' fixedWidth/>
										</ListItemIcon>
										<ListItemText primary={page.name[locale]} style={{paddingLeft:'20px'}}/>
									</ListItem>
								)

							})
						}
					</List>

				</Drawer>

				<main className={classes.content}>
					<div className={classes.toolbar}/>
					{this.props.children}
				</main>
			</div>
		);
	}

	componentDidMount(){
		let url = '/getInfo/pages/';
		axios.get(url)
			.then((results) => {
				console.log('show pages:',results.data);
				this.setState({pages:results.data})
			});
	}

	navigateTo(dest){
		console.log('currently on:',window.location.pathname);
		console.log('navigate to:',dest);
		if(window.location.pathname!==dest)
			window.location = dest;
	}
}

MainMenu.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

const drawerWidth = 240;
const styles = theme => ({
	root: {
		flexGrow: 1,
		height: '100vh',
		zIndex: 1,
		overflow: 'hidden',
		position: 'relative',
		display: 'flex',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginLeft: 5,
		marginRight: 36,
		minWidth:32,
	},
	hide: {
		display: 'none',
	},
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing.unit * 7,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing.unit * 9,
		},
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3,
	},
});


export default withStyles(styles, { withTheme: true })(MainMenu);
