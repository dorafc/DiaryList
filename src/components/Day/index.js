import React, {Component} from 'react';

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
			<div className="day">
				<DateHeader date={this.props.label} />
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