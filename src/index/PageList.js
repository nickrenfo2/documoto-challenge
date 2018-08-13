import React, {Component} from 'react';
import {List, ListItem, ListItemText} from '@material-ui/core';
import axios from "axios";
import LoadingCard from "../shared/components/LoadingCard";

class PageList extends Component {
	constructor(){
		super();
		this.state = {
			pages:null
		}
	}

	render(){
		let {locale} = this.props;
		let {pages} = this.state;
		return (
			<List className="PageList">
				{
					pages === null && <LoadingCard/>
				}
				{
					pages && pages.map((page,ind)=>{
						let name = page.name[locale];
						return (
							<ListItem key={ind} button onClick={this.goToPage.bind(this,page.id)}>
								<ListItemText primary={name}/>
							</ListItem>
						)
					})
				}
			</List>
		)
	}

	componentDidMount(){
		let url = '/getInfo/pages/';
		axios.get(url)
			.then((results) => {
				this.setState({pages:results.data})
			});
	}

	goToPage(id){
		window.location = '/page/' + id;
	}
}

export default PageList;
