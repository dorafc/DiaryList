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

		// userDb.doc('2019-06-30').collection('notes').doc('f7OMk1OnNzwqt9ofGAzV').get()
		// .then((doc) => {
		// 	if (doc.exists) {
  //       console.log("Document data:", doc.data());
	 //    } else {
	 //        // doc.data() will be undefined in this case
	 //        console.log("No such document!");
	 //    }
		// })
		// .catch((error) => {console.log("Error getting document:", error)})

		// let today = new Date()
		let yesterday = new Date(new Date() -  8.64e+7)

		// TODAY
		// console.log(today.toISOString().slice(0,10))
		userDb.doc(yesterday.toISOString().slice(0,10)).collection('notes').get()
		.then((querySnapshot) => {
			let newData = this.state.today.slice()
			// console.log('TODAY')
			querySnapshot.forEach((doc) => {
				console.log(doc.id, " => ", doc.data());
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