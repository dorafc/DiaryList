import React, {Component} from 'react';

import styled, { css } from 'styled-components'

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
		const done = (this.props.isFuture) ? <Done onEdit={this.props.onEdit} id={this.props.id} day={this.props.day} /> : ''
		
		return(
			<ColorCodesContext.Consumer>
				{ (codes) => {
					return codes.map((code,i) => {
						if (this.props.theme === code.name){
							return (
								<EntryView className={"entry "+this.props.theme+" "+future} key={i} bgColor={code.color} isFuture={this.props.isFuture}>
									
									{this.props.shortText}
									<Editors className="editors">
										{done}
										<Edit onEdit={this.props.onEdit} id={this.props.id} day={this.props.day}/>
									</Editors>
								</EntryView>
							)
						} else {
							return ''
						}
			 		})
			 	}}
			 </ColorCodesContext.Consumer>
		)
	}
	
}

function Edit(props){
	return(
		<EditButton href="#editentry" onClick={(e) => props.onEdit(e, props.id, props.day, false)} className="material-icons edit">edit</EditButton>
	)
}

function Done(props){
	return(
		<DoneButton href="#complete" onClick={(e) => props.onEdit(e, props.id, props.day, true)} className="material-icons done" >done</DoneButton>
	)
}

const EntryView = styled.li`
	background-color: ${props => props.bgColor};
	color: #3f3f3f;
	margin: 0 10px 10px 0;
	padding: 7px 10px;
	border-radius: 7px;
	display: flex;
	transition: .3s all ease-out;
	position: relative;
	z-index: 1;
	height: 32px;
	${props => (props.isFuture) && css`
		box-sizing: border-box;
    background-color: white;
		border: solid 2px ${props => props.bgColor};
  `}

	:hover .editors{
		opacity: 1;
	}

	:hover{
		padding: 7px 30px 7px 10px;
	}
	${props => (props.isFuture) && css`
		:hover{
			padding: 7px 50px 7px 10px;
		}
  `}
`

const EditButton = styled.a`
	margin-left: 3px;
	color: #4f4f4f;
	text-decoration: none;
	font-size: 16px;
	line-height: 1em;
	transition: .3s all ease-in-out;
`

const DoneButton = styled.a`
	margin-left: 3px;
	color: #4f4f4f;
	text-decoration: none;
	font-size: 16px;
	line-height: 1em;
	transition: .3s all ease-in-out;
`

const Editors = styled.div`
	position: absolute;
	right: 7px;
	opacity: 0;
	transition: .3s all ease-in-out;
`

export default Entry;