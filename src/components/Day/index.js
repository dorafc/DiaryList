import React, {Component} from 'react';

import Entry from '../Entry'
import AddEntry from '../AddEntry'

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
				notes.push(note.data())
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

		// listen for changes, doesn't work quite right yet
		if (this.props.label === 'Today'){

			userDb.onSnapshot((notes) => {
				console.log('here')
				let newData = []
				notes.forEach((note) => {
					newData.push(note.data())
				})
				this.setState({
					notes : newData
				})
			})
		}

	}

	render(){
		const entryList = this.state.notes.slice().map((note, i) => {
			return(
				<Entry shortText={note.shortText} theme={note.theme} longText={note.longText} key={"note" + i} onEdit={this.props.onEdit} />
			)
		})

		return (
			<div className="day">
				<DateHeader date={this.props.label} />
				{((this.props.label === 'Today') || (this.props.label === 'Yesterday')) &&
					<AddEntry />
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

// function AddEntry(){
// 	return(
// 		<a className="AddEntry" href="#test">+</a>
// 	)
// }


export default Day;