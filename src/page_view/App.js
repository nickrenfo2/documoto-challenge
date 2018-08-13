import React, {Component} from 'react';

import Root from '../shared/components/Root';
import {Card} from '@material-ui/core';
import Page from '../shared/components/Page'
import LoadingCard from '../shared/components/LoadingCard'
import axios from 'axios';

//Font-Awesome
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';//TODO: Only import USED icons, instead of ALL icons.
library.add(fas);

class App extends Component {
	constructor(){
		super();
		this.state = {
			locale:'en',
			page:null,
		}
	}

	render(){
		let {locale, page} = this.state;
		return (
			<Root locale={locale} setLocale={this.setLocale.bind(this)}>
					<Card>
						{
							page===null &&
								<LoadingCard/>
						}
						{
							page &&
							<Page locale={locale} page={page}/>
						}
					</Card>
			</Root>
		)
	}

	componentDidMount(){
		let urlpath = window.location.pathname;
		let pageId = urlpath.replace('/page/','');
		let url = '/getInfo/page/' + pageId;
		axios.get(url)
			.then((results) => {
				this.setState({page:results.data})
			});
	}

	setLocale(locale){
		this.setState({locale})
	}
}

export default App;
