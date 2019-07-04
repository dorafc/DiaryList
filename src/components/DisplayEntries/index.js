import React, {Component} from 'react';

import Day from '../Day';
import { withFirebase } from '../Firebase';

class DisplayEntries extends Component {
	constructor(props) {
		super(props);
    this.state = {
    	dateEntries : []
    }
  }

  componentDidMount(){
  	const db = this.props.firebase.db;
		const userDb = db.collection('users').doc('dcaswell').collection('dates')

		// get date collections
		userDb.get()
		.then((querySnapshot) => {
			let dates = [];

			querySnapshot.forEach((doc) => {
				dates.push(doc.id)
			})
			return dates
		})
		.then((data) => {
			this.setState({
				dateEntries : data
			})
		})
		.catch((error) => {
			console.log("Error getting dates documents: ", error);
		})
  }

	render(){
		const days = this.state.dateEntries.slice().map((date,i) => {
			return(
				<DayData day={date} key={date+i}/>
			)
		})
		return (
			<div className="DisplayEntries">
				{days}
			</div>
		)
	}
}

const DayData = withFirebase(Day)

export default DisplayEntries;