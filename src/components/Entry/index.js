import React, {Component} from 'react';

import styled, { css } from 'styled-components'

import { ColorCodesContext } from '../KeyTheme';
import { withFirebase } from '../Firebase';

// <Entry> : displays note and edit button for each entry
class Entry extends Component{
	constructor(props) {
		super(props);
    this.state = {
    }
	}

	render(){
		const data = this.props.note.data()
		const future = (data.isFuture) ? 'isFuture' : ''

		return(
			<ColorCodesContext.Consumer>
				{ (codes) => {
					return codes.map((code,i) => {
						{/* render entry for theme with corresponding color code */}
						if (data.theme === code.name && (this.props.showAll || (!this.props.showAll && data.isFuture))){
							return (
								<EntryView className={"entry "+data.theme+" "+future} key={i} bgColor={code.color} isFuture={data.isFuture}>
									
									{data.shortText}
									<Editors className="editors" isFuture={data.isFuture}>
										{data.isFuture && 
											<Done onEdit={this.props.onEdit} noteRef={this.props.note.ref} />
										}
										<Edit 
											onEdit={this.props.onEdit} 
											noteRef={this.props.note.ref}
										/>
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

// <Edit> : Edit button for entry
function Edit(props){
	return(
		<EditButton 
			href="#editentry" 
			onClick={(e) => props.onEdit(e, props.noteRef, false)} 
			className="material-icons edit"
		>edit</EditButton>
	)
}

// <Done> : Checkmark for future items
function Done(props){
	return(
		<DoneButton href="#complete" onClick={(e) => props.onEdit(e, props.noteRef, true)} className="material-icons done" >done</DoneButton>
	)
}

const EntryView = styled.li`
	background-color: ${props => props.bgColor};
	color: #3f3f3f;
	margin: 0 10px 10px 0;
	padding: 7px 30px;
	border-radius: 7px;
	display: flex;
	transition: .3s all ease-out;
	position: relative;
	z-index: 1;
	${props => (props.isFuture) && css`
		box-sizing: border-box;
    background-color: white;
		border: solid 2px ${props => props.bgColor};
  `}

	:hover .editors{
		opacity: 1;
	}

	:hover{
		padding: 7px 40px 7px 20px;
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
	right: 17px;
	opacity: 0;
	transition: .3s all ease-in-out;
	${props => (props.isFuture) && css`
		right: 7px;
  `}
`

export default withFirebase(Entry);