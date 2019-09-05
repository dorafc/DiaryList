import React, {Component} from 'react';

import styled, { css } from 'styled-components'
import * as styles from '../../constants/styles.js';

import Entry from '../Entry'
import { withFirebase } from '../Firebase';

class Day extends Component {
	constructor(props) {
		super(props);
    this.state = {
			notes : [],
			queryNotes : [],
			hasFuture : false,
			date : ''
    }
	}

	componentDidMount(){
    // const db = this.props.firebase.db;
		const userDb = this.props.day.ref.collection("notes").orderBy("date", "asc")

		// get notes collections
		userDb.get()
		.then((querySnapshot) => {
			let notes = []
			querySnapshot.forEach((note) => {
				let data = note.data()
				data.id = note.id
				data.day = this.props.day.id
				notes.push(data)
			})
			this.setState({
				queryNotes : querySnapshot
			})

			return notes
		})
		.then((data) => {
			// Set State
			this.setState({
				notes : data
			})
		})
		.then(() => {
			const futureNotes = this.state.notes.slice().filter(note => note.isFuture)

			this.setState({
				hasFuture : (futureNotes.length >= 1)
			})
		})
		.catch((error) => {
			console.log("Error getting notes documents: ", error);
		})

		userDb.onSnapshot((notes) => {
			let newData = []
			notes.forEach((note) => {
				let data = note.data()
				data.id = note.id
				data.day = this.props.day.id
				newData.push(data)
			})
			this.setState({
				notes : newData
			})
		})	
	}

	render(){
		const entryList = this.state.notes.slice().map((note, i) => {
			if ((this.props.showAll) || (!this.props.showAll && note.isFuture)) {
				return(
					<Entry 
						shortText={note.shortText} 
						theme={note.theme} 
						longText={note.longText} 
						isFuture={note.isFuture}
						id={note.id}
						day={note.day}
						key={"note" + i} 
						onEdit={this.props.onEdit} 
					/>
				)
			}
			else {
				return '';
			}
			
		})

		if (this.state.hasFuture === true || this.props.showAll === true){
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
	${props => (props.day ==='Today') && css`
    ${'' /* border: solid 1px ${styles.lightGreen}; */}
  `}
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