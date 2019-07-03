import React, {Component} from 'react';

import Day from '../Day';

class DisplayEntries extends Component {
	constructor(props) {
		super(props);
    this.state = {
    	test : "beep",
    	today : [],
    }
  }

  componentDidMount(){
  	const db = this.props.firebase.db;
		const userDb = db.collection('users').doc('dcaswell').collection('dates')

		let today = new Date()
		// let yesterday = new Date(new Date() -  8.64e+7)

		console.log(userDb.get())


		// TODAY
		userDb.doc(today.toISOString().slice(0,10)).collection('notes').get()
		.then((querySnapshot) => {
			let newData = this.state.today.slice()
			// console.log('TODAY')
			querySnapshot.forEach((doc) => {
				// console.log(doc.id, " => ", doc.data());
				newData.push(doc.data())
			})
			this.setState({
				today : newData
			})
		})
		.catch((error) => {
			console.log("Error getting documents: ", error);
		})

		//  YESTERDAY
		// userDb.doc(yesterday.toISOString().slice(0,10)).collection('notes').get()
		// .then((querySnapshot) => {
		// 	// console.log(querySnapshot)
		// 	console.log('YESTERDAY')
		// 	querySnapshot.forEach((doc) => {
		// 		console.log(doc.id, " => ", doc.data());
		// 	})
		// })
		// .catch((error) => {
		// 	console.log("Error getting documents: ", error);
		// })
  }

	render(){
		return (
			<div className="DisplayEntries">
				<Day date="Today" entryCount={2} data={this.state.today} />
			</div>
		)
	}
}

// higher order components with Firebase

export default DisplayEntries;