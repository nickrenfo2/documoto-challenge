import React, {Component} from 'react';

import {CssBaseline} from '@material-ui/core';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import MainMenu from './MainMenu';

//Font-Awesome
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';//TODO: Only import USED icons, instead of ALL icons.
library.add(fas);

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#01579b',//light-blue / darken-4
		},
		secondary: {
			main: '#9ccc65',//light-green / lighten-1
		},
	},
});

class Root extends Component {
	render(){
		let setLocale = this.props.setLocale || function(){console.log('noset loc');};
		return (
			<div className="RootWrap">
				<CssBaseline/>
				<MuiThemeProvider theme={theme}>
					<MainMenu theme={theme} classes={{}} locale={this.props.locale} setLocale={setLocale.bind(this)}>
						<div className="main">
							{this.props.children}
						</div>
					</MainMenu>
				</MuiThemeProvider>
			</div>
		)
	}
}

export default Root;
