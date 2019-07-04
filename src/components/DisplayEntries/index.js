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
		// let noteEntries = [];

		// let today = new Date()

		// get date collections
		// userDb.get()
		// .then((querySnapshot) => {
		// 	querySnapshot.forEach((doc, i) => {
		// 		dateEntries.push(doc.id)
		// 		let entries = []
		// 		userDb.doc(doc.id).collection('notes').get()
		// 		.then((queryNotes) => {
		// 			queryNotes.forEach((doc) => {
		// 				// console.log(doc.data())
		// 				entries.push(doc.data())
		// 			})
		// 			noteEntries.push(entries)
		// 		})
		// 		.catch((error) => {
		// 			console.log("Error getting notes documents: ", error);
		// 		})
		// 	})
		// 	console.log(noteEntries[2])
		// 	this.setState({
		// 		// dateEntries : dateEntries,
		// 		numDates : dateEntries.length,
		// 	})
		// 	// dateEntries.forEach(foo => console.log(foo))
		// })
		// .catch((error) => {
		// 	console.log("Error getting dates documents: ", error);
		// })

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