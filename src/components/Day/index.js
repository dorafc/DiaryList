import React, {Component} from 'react';

import styled, { css } from 'styled-components'
import * as styles from '../../constants/styles.js';

import Entry from '../Entry'
import { withFirebase } from '../Firebase';

// <Day> : Displays the entries for each day
class Day extends Component {
	constructor(props) {
		super(props);
    this.state = {
			notes : [],
			hasFuture : false,
			date : ''
		}
	}

	componentDidMount(){
		// grab data after component mounts
		const userDb = this.props.day.ref.collection("notes").orderBy("date", "asc") 	//DB of user notes

		// set state if the day has a future note
		this.props.day.ref.collection("notes").where("isFuture", "==", true)
		.onSnapshot((query) => {
			if(query.docs.length > 0){
				this.setState({
					hasFuture : true
				})
			}
		})

		// update state to include notes data
		userDb.onSnapshot((notes) => {
			this.setState({
				notes : notes.docs
			})
		})	
	}

	render(){
		// create an array of Entry components for each note
		const entryList = this.state.notes.slice().map((note, i) => {
			if ((this.props.showAll) || (!this.props.showAll && this.state.hasFuture)) {
				return(
					<Entry 
						note = {note}
						key = {"note" + i}
						showAll = {this.props.showAll} 
						onEdit = {this.props.onEdit}

						day={this.props.day.id}
					/>
				)
			}
			else {
				return '';
			}
		})

		// render Day if the app is set to show All or if the day has a future event, otherwise do not render anything
		if (((this.props.showAll) || (!this.props.showAll && this.state.hasFuture)) && (entryList.length > 0)){
			return (
				<DayView day={this.props.label}>
					<DateHeader date={this.props.day.data().date.toDate().toDateString()}/>
					<EntryList>{entryList}</EntryList>
				</DayView>
			)
		} else {
			return '';
		}
	}
}

// <DateHeader> : display the date at the top of the day, or text showing Today or Yesterday
function DateHeader(props) {
	let today = new Date().toDateString()
	let yesterday = new Date()
	yesterday.setDate(yesterday.getDate() - 1)
	yesterday = yesterday.toDateString()

	let dateHeadStyle = '';
	let dateLabel = props.date
	if (props.date === today){
		dateHeadStyle = 'Today'
		dateLabel = 'Today'
	} else if (props.date === yesterday){
		dateHeadStyle = 'Yesterday'
		dateLabel = 'Yesterday'
	}

	return <DateTitle bgDate={dateHeadStyle}>{dateLabel}</DateTitle>
}

// Styles
const DayView = styled.div`
	background-color: white;
	margin: 0 0 14px 0;
	padding: 0 0 10px 0;
	border-radius: 4px;
	box-shadow: 0 3px 3px -4px gray;
`

const DateTitle = styled.h2`
	color: ${styles.green};
	margin: 0;
	padding: 10px;
	font-size: 14px;
	text-transform: uppercase;
	${props => (props.bgDate ==='Today') && css`
    background: ${styles.lightGreen};
    color: white;
  `}
	${props => (props.bgDate ==='Yesterday') && css`
    background: ${styles.paleGreen};
  `}
`

const EntryList = styled.ul`
	margin: 10px;
	padding: 0;
	list-style: none;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
`

export default withFirebase(Day);