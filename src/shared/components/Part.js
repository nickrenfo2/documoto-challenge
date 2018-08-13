import React, {Component} from 'react';
import {Card, CardContent, CardMedia, Typography} from '@material-ui/core';


class Part extends Component {
	constructor(){
		super();
		this.state = {
			parts:null,
		}
	}
	render(){
		let {locale, id, partNumber} = this.props;
		let thumb = this.props.tags._thumbnail[0];
		let name = this.props.name[locale];
		return (
			<Card className="Part">
				<CardMedia image={thumb} title={name} className="partImage"/>
				<CardContent>
					<Typography gutterBottom variant="headline" component="h2">
						{name}
					</Typography>
					<Typography component="p">
						id:{id}
					</Typography>
					<Typography component="p">
						Part Number:{partNumber}
					</Typography>
				</CardContent>
			</Card>
		)
	}
}

export default Part;
