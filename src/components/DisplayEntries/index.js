import React, {Component} from 'react';

import Day from '../Day';

class DisplayEntries extends Component {
	constructor(props) {
		super(props);
    this.state = {
    	
    }
  }

	render(){
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

		userDb.doc('2019-06-30').collection('notes').get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				console.log(doc.id, " => ", doc.data());
			})
		})
		.catch((error) => {
			console.log("Error getting documents: ", error);
		})

		return (
			<div className="DisplayEntries">
				<Day date="Today" entryCount={2} />
		    <Day date="Yesterday" entryCount={5} />
		    <Day date="Monday, June 24" entryCount={8} />
			</div>
		)
	}
}

export default DisplayEntries;