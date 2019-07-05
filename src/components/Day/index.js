import React, {Component} from 'react';

import Entry from '../Entry'

class Day extends Component {
	constructor(props) {
		super(props);
    this.state = {
    	notes : [],
    	day : ''
    }
	}

	componentDidMount(){
  	const db = this.props.firebase.db;
		const userDb = db.collection('users').doc('dcaswell').collection('dates').doc(this.props.day).collection('notes')

		// get notes collections
		userDb.get()
		.then((querySnapshot) => {
			let notes = []
			querySnapshot.forEach((note) => {
				notes.push(note.data())
			})
			return notes
		})
		.then((data) => {

			// Figure out Date stuff
			const date = data[0].date.toDate()
			const day = new Date(date.getFullYear(), date.getMonth(), date.getDay()).toDateString()
			const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay()).toDateString()
			let yesterday = new Date();
			yesterday.setDate(yesterday.getDate() - 1);
			yesterday = yesterday.toDateString()

			let setDay;

			if (day === today){
				setDay = 'Today'
			} else if (day === yesterday){
				setDay = 'Yesterday'
			}
			else {
				setDay = day
			}

			// Set State
			this.setState({
				notes : data,
				day : setDay
			})
		})
		.catch((error) => {
			console.log("Error getting notes documents: ", error);
		})

		// listen for changes, doesn't work quite right yet
		if (this.state.day === 'Today'){
			userDb.onSnapshot((notes) => {
				let newData = []
				notes.forEach((note) => {
					// console.log(note.data())
					newData.push(note.data())
				})
				this.setState({
					data : newData
				})
			})
		}

	}

	render(){
		// const db = this.props.firebase.db;
		// const userDb = db.collection('users').doc('dcaswell').collection('dates').doc(this.props.day).collection('notes')
		const entryList = this.state.notes.slice().map((note, i) => {
			return(
				<Entry shortText={note.shortText} theme={note.theme} longText={note.longText} key={"note" + i} />
			)
		})

		return (
			<div className="day">
				<DateHeader date={this.state.day} />
				{/*this.props.date === 'Today' &&
					<AddEntry />*/
				}
				<ul>{entryList}</ul>
				<hr />
			</div>
		)
	}
}

function DateHeader(props) {
	return <h2 className="dateHeader">{props.date}</h2>
}

function AddEntry(){
	return(
		<div className="AddEntry">Add Entry</div>
	)
}


export default Day;