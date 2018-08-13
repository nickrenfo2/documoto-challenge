import React from 'react';
import {Menu, MenuItem, ListItem, ListItemText, ListItemIcon} from '@material-ui/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class LocaleMenu extends React.Component {
	state = {
		anchorEl: null,
	};

	handleClick = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	render() {
		const { anchorEl } = this.state;
		const self = this;
		const {locale} = this.props;
		const locales = ['en', 'fr'];
		return (
			<ListItem button
								onClick={this.handleClick}>
				<ListItemIcon>
					<FontAwesomeIcon icon="language" fixedWidth/>
				</ListItemIcon>
				<ListItemText primary="Set Language"/>
					<Menu
						id="simple-menu"
						anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={this.handleClose}
					>
						{
							locales.map((loc, ind) => {
								return (
									<MenuItem key={ind} className="localeMenuItem" onClick={event => this.setLocale(event, loc)} selected={locale === loc}>
										{loc}
									</MenuItem>
								)
							})
						}
					</Menu>
			</ListItem>
		);
	}

	setLocale(event,loc){
		this.props.setLocale(loc);
		this.handleClose();
		event.stopPropagation();
	}

}

export default LocaleMenu;