import React, {Component} from 'react';
import Part from './Part';
import {Card, Typography, Grid} from '@material-ui/core';
import axios from "axios";
import LoadingCard from "./LoadingCard";

class Page extends Component {
	constructor(){
		super();
		this.state = {
			parts:null
		}
	}
	render(){
		let {locale, page, id} = this.props;
		let {parts} = this.state;
		let name = page.name[locale];
		return (
			<Card className="Page">
				<Typography variant="headline" component="h2" className="pageHeadline">
					{name}
				</Typography>
				<Grid container spacing={16}>
					{
						parts === null && <LoadingCard/>
					}
					{
						parts && parts.map((part, ind) => {
							return (
								<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={ind}>
									<Part  {...part} locale={locale}/>
								</Grid>
							)
						})
					}
				</Grid>
			</Card>
		);
	}

	componentDidMount(){
		let pageId = this.props.page.id;
		let url = '/getInfo/pageParts/' + pageId;
		axios.get(url)
			.then((results) => {
				this.setState({parts:results.data})
			});
	}
}

export default Page;
