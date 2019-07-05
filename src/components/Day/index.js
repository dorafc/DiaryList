import React, {Component} from 'react';

import Entry from '../Entry'

class Day extends Component {
	constructor(props) {
		super(props);
    this.state = {
    	notes : [],
    	day : ''
    }
	}

	componentDidMount(){
  	const db = this.props.firebase.db;
		const userDb = db.collection('users').doc('dcaswell').collection('dates').doc(this.props.day).collection('notes')

		// get notes collections
		userDb.get()
		.then((querySnapshot) => {
			let notes = []
			querySnapshot.forEach((note) => {
				notes.push(note.data())
			})
			return notes
		})
		.then((data) => {
			const date = data[0].date.toDate()
			const day = new Date(date.getFullYear(), date.getMonth(), date.getDay()).toDateString()
			const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay()).toDateString()
			let setDay;

			if (day === today.toString()){
				setDay = 'Today'
			} else {
				setDay = day
			}

			this.setState({
				notes : data,
				day : setDay
			})
		})
		.catch((error) => {
			console.log("Error getting notes documents: ", error);
		})

	}

	render(){
		const entryList = this.state.notes.slice().map((note, i) => {
			return(
				<Entry shortText={note.shortText} theme={note.theme} longText={note.longText} key={"note" + i} />
			)
		})

		return (
			<div className="day">
				<DateHeader date={this.state.day} />
				{/*this.props.date === 'Today' &&
					<AddEntry />*/
				}
				<ul>{entryList}</ul>
				<hr />
			</div>
		)
	}
}

function DateHeader(props) {
	return <h2 className="dateHeader">{props.date}</h2>
}

function AddEntry(){
	return(
		<div className="AddEntry">Add Entry</div>
	)
}


export default Day;