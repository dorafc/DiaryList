import React, {Component} from 'react';

import Day from '../Day';
import { withFirebase } from '../Firebase';

class DisplayEntries extends Component {
	constructor(props) {
		super(props);
    this.state = {
			queryDocs : []
    }
  }

  componentDidMount(){
    const db = this.props.firebase.db;
		const userDb = db.collection('users').doc(this.props.userId).collection("dates").orderBy("date", "desc")
		
    // get date collections
    // userDb.get()
    // .then((querySnapshot) => {
		// 	this.setState({
		// 		queryDocs : querySnapshot.docs
		// 	})
    // })
    // .catch((error) => {
    //   console.log("Error getting dates documents: ", error);
		// })
		userDb.onSnapshot((querySnapshot)=>{
			this.setState({
				queryDocs : querySnapshot.docs
			})
		})
  }

	render(){
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
				{/* {emptyToday} */}
				{days}
			</div>
		)
	}
}

export default withFirebase(DisplayEntries);