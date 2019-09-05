import React, {Component} from 'react';

import Day from '../Day';
import { withFirebase } from '../Firebase';

class DisplayEntries extends Component {
	constructor(props) {
		super(props);
    this.state = {
			dateEntries : [],
			queryDocs : []
    }
  }

  componentDidMount(){
    const db = this.props.firebase.db;
		const userDb = db.collection('users').doc(this.props.userId).collection("dates").orderBy("date", "desc")
		
    // get date collections
    userDb.get()
    .then((querySnapshot) => {
			let datesIds = [];

			this.setState({
				queryDocs : querySnapshot.docs
			})

      querySnapshot.forEach((doc) => {
        datesIds.push(doc.id)
			})
      return datesIds
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

		// const days = this.state.dateEntries.slice().map((date) => {
		// 	// calc date labels
		// 	let label;

		// 	if (date === today){
		// 		label = "Today"
		// 	} else if (date === yesterday){
		// 		label = "Yesterday"
		// 	} else {
		// 		label = new Date(date).toDateString()
		// 	}

		// 	return(
		// 		<DayData 
		// 			day={date} 
		// 			key={date} 
		// 			label={label} 
		// 			onEdit={this.props.onEdit} 
		// 			showAll={this.props.showAll} 
		// 			userId={this.props.userId} 
		// 		/>
		// 	)
		// })

		const days = this.state.queryDocs.slice().map((date, i) => {
			// calc date labels
			// let label = 'foo';

			// if (date === today){
			// 	label = "Today"
			// } else if (date === yesterday){
			// 	label = "Yesterday"
			// } else {
			// 	label = new Date(date).toDateString()
			// }

			return(
				<Day 
					day={date}
					key={'day'+i} 
					onEdit={this.props.onEdit} 
					showAll={this.props.showAll} 
					userId={this.props.userId} 
				/>
			)
		})

		// let emptyToday = ''
		// if (this.state.dateEntries[0] !== today && this.state.dateEntries[0] !== undefined) {
		// 	emptyToday = <DayData day={today} key={today} label='Today' onEdit={this.props.onEdit} userId={this.props.userId} />
		// }

		return (
			<div className="DisplayEntries">
				{/* {emptyToday} */}
				{days}
			</div>
		)
	}
}

// const DayData = withFirebase(Day)

export default withFirebase(DisplayEntries);