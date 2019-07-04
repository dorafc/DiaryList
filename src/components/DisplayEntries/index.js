import React, {Component} from 'react';

import Day from '../Day';

class DisplayEntries extends Component {
	constructor(props) {
		super(props);
    this.state = {
    	dateEntries : [],
    	numDates : 0,
    	noteEntries : []
    }
  }

  componentDidMount(){
  	const db = this.props.firebase.db;
		const userDb = db.collection('users').doc('dcaswell').collection('dates')

		// let dateEntries = [];
		let noteEntries = [];

		// let today = new Date()

		// get date collections
		userDb.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc, i) => {
				// console.log(doc.data())
				// dateEntries.push(doc.id)
			// 	let entries = []
				userDb.doc(doc.id).collection('notes').get()
				.then((queryNotes) => {
					let entries = []
					// console.log(doc.data().date)
					queryNotes.forEach((notes) => {
						// console.log(notes.data())
						entries.push(notes.data())
					})
					// console.log(entries)
					noteEntries.push(entries)
			// 	})
			// 	.catch((error) => {
			// 		console.log("Error getting notes documents: ", error);
				})
			// })
			// this.setState({
			// 	// dateEntries : dateEntries,
			// 	numDates : dateEntries.length,
			})
			// console.log(noteEntries)
			this.setState({
				noteEntries : noteEntries
			})
		})
		.catch((error) => {
			console.log("Error getting dates documents: ", error);
		})

		//get entries
		// console.log(this.state.dateEntries)
		// dateEntries.forEach(foo => console.log(foo))

  }

	render(){
		return (
			<div className="DisplayEntries">
				<Day date="Test" data={[{shortText : "Hello, this is some text", theme : 'make'}]} />
			</div>
		)
	}
}

// higher order components with Firebase

export default DisplayEntries;