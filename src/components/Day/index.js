import React, {Component} from 'react';

import styled, { css } from 'styled-components'
import * as styles from '../../constants/styles.js';

import Entry from '../Entry'

class Day extends Component {
	constructor(props) {
		super(props);
    this.state = {
			notes : [],
			hasFuture : false
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

	// componentDidUpdate(){
	// 	const futureNotes = this.state.notes.slice().filter(note => note.isFuture)

	// 		console.log(futureNotes)
	// 		this.setState({
	// 			hasFuture : (futureNotes.length >= 1)
	// 		})
	// }

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
					<DateHeader date={this.props.label} />
					<EntryList>{entryList}</EntryList>
				</DayView>
			)
		} else {
			return '';
		}
	}
}

function DateHeader(props) {
	const dateHeadStyle = (props.date === 'Today' || props.date === 'Yesterday') ? props.date : ''
	return <DateTitle bgDate={dateHeadStyle}>{props.date}</DateTitle>
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
	${'' /* border-bottom: solid 1px ${styles.green}; */}
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

export default Day;