import React, {Component} from 'react';

import Root from '../shared/components/Root';
import {Card, CardContent, Typography} from '@material-ui/core';
import PageList from './PageList';

//Font-Awesome
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';//TODO: Only import USED icons, instead of ALL icons.
library.add(fas);


class App extends Component {
	constructor(){
		super();
		this.state = {
			locale:'en'
		}
	}

	render(){
		let {locale} = this.state;
		return (
			<Root locale={locale} setLocale={this.setLocale.bind(this)}>
					<Card>
						<CardContent>
							<Typography variant="headline">Welcome to Parts Listing</Typography>

							<PageList locale={locale}/>

						</CardContent>
					</Card>
			</Root>
		)
	}

	setLocale(locale){
		this.setState({locale})
	}
}

export default App;
