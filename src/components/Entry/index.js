import React, {Component} from 'react';

import styled, { css } from 'styled-components'
import * as styles from '../../constants/styles.js';

import { ColorCodesContext } from '../KeyTheme';

class Entry extends Component{
	constructor(props) {
		super(props);
    this.state = {
    	color : 'red',
    }
	}


	render(){
		const future = (this.props.isFuture) ? 'isFuture' : ''
		
		return(
			<ColorCodesContext.Consumer>
				{ (codes) => {
					return codes.map((code,i) => {
						if (this.props.theme === code.name){
							return (
								<EntryFunTimes className={"entry "+this.props.theme+" "+this.props.future} key={i} bgColor={code.color}>
									{this.props.shortText}
									<Edit onEdit={this.props.onEdit} id={this.props.id} day={this.props.day}/>
								</EntryFunTimes>
							)
						}
						
			 		})
			 	}}
			 </ColorCodesContext.Consumer>
		)
	}
	
}

// function EntryContent(props){
// 	return (
// 		<EntryItem className={"entry "+props.theme+" "+props.future}>
// 			{props.shortText}
// 			<a href="#editentry" onClick={(e) => props.onEdit(e, props.id, props.day)}>Edit</a>
// 		</EntryItem>
// 	)
// }

function Edit(props){
	return(
		<EditButton href="#editentry" onClick={(e) => props.onEdit(e, props.id, props.day)} className="material-icons edit">edit</EditButton>
	)
}

const EntryFunTimes = styled.li`
	background-color: ${props => props.bgColor};
	color: #3f3f3f;
	margin: 0 10px 10px 0;
	padding: 7px 10px;
	border-radius: 7px;
	display: flex;
	transition: .3s all ease-out;
	position: relative;

	:hover a.edit{
		opacity: 1;
	}

	:hover{
		padding: 7px 30px 7px 10px;
	}
`

const EditButton = styled.a`
	display: block;
	position: absolute;
	right: 7px;

	margin-left: 3px;
	color: #4f4f4f;
	text-decoration: none;
	font-size: 16px;
	line-height: 1em;
	opacity: 0;
	transition: .3s all ease-in-out;
`

export default Entry;