import React, {Component} from 'react';

import Day from '../Day';
import { withFirebase } from '../Firebase';

// <DisplayEntries> : contains days of notes displayed on the app
class DisplayEntries extends Component {
	constructor(props) {
		super(props);
    this.state = {
			queryDocs : []		// array of date docs from firebase
    }
  }

  componentDidMount(){
    const db = this.props.firebase.db;					// firebase database
		const userDb = db.collection('users').doc(this.props.userId).collection("dates").orderBy("date", "desc") // all dates from user

		// set state from dates with entries
		userDb.onSnapshot((querySnapshot)=>{
			this.setState({
				queryDocs : querySnapshot.docs
			})
		})
  }

	render(){
		//  create an array of all days the user has created entries as Day components
		const days = this.state.queryDocs.slice().map((date, i) => {
			return(
				<Day 
					day={date}
					key={date.id} 
					onEdit={this.props.onEdit} 
					showAll={this.props.showAll} 
					userId={this.props.userId} 
				/>
			)
		})
		
		return (
			<div className="DisplayEntries">
				{days}
			</div>
		)
	}
}

export default withFirebase(DisplayEntries);