import React, {Component} from 'react';

import styled, { css } from 'styled-components'
import * as styles from '../../constants/styles.js';

import Entry from '../Entry'

class Day extends Component {
	constructor(props) {
		super(props);
    this.state = {
    	notes : []
    }
	}

	componentDidMount(){
  	const db = this.props.firebase.db;
		const userDb = db.collection('users').doc('dcaswell').collection('dates').doc(this.props.day).collection("notes").orderBy("date", "asc")

		// get notes collections
		userDb.get()
		.then((querySnapshot) => {
			let notes = []
			querySnapshot.forEach((note) => {
				let data = note.data()
				data.id = note.id
				data.day = this.props.day
				notes.push(data)
			})
			return notes
		})
		.then((data) => {


			// Set State
			this.setState({
				notes : data
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
					data.day = this.props.day
					newData.push(data)
				})
				this.setState({
					notes : newData
				})

				// var source = notes.metadata.fromCache ? "local cache" : "server";
    		// console.log("Data came from " + source);
			})

	}

	render(){
		const entryList = this.state.notes.slice().map((note, i) => {
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
		})

		return (
			<DayView>
				<DateHeader date={this.props.label} />
				<EntryList>{entryList}</EntryList>
			</DayView>
		)
	}
}

function DateHeader(props) {
	return <DateTitle>{props.date}</DateTitle>
}

// Styles

const DayView = styled.div`
	background-color: white;
	${'' /* padding:  10px; */}
	margin: 0 0 14px 0;
	padding: 0 0 10px 0;
	border-radius: 4px;
	box-shadow: 0 3px 3px -4px gray;
`

const DateTitle = styled.h2`
	color: ${styles.green};
	margin: 0;
	${'' /* letter-spacing: 1px; */}
	border-bottom: solid 1px ${styles.green};
	padding: 10px;
	font-size: 14px;
	text-transform: uppercase;
`

const EntryList = styled.ul`
	margin: 10px;
	padding: 0;
	list-style: none;
`

export default Day;