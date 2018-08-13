import React, {Component} from 'react';
import {Card, CardContent} from '@material-ui/core';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class LoadingCard extends Component {
	render(){
		return (
			<Card className="LoadingCard">
				<CardContent>
					<FontAwesomeIcon icon="spinner" spin/>
				</CardContent>
			</Card>
		)
	}
}

export default LoadingCard;
