import React from 'react';

import Entry from '../Entry'
// import AddEntry from '../AddEntry'

function Day(props) {
	// set list of the days entries
	const entryList = Array(props.entryCount).fill('').map((info, i) => 
		<Entry key={"entry"+i}/>
	)

	return (
		<div className="day">
			<DateHeader date={props.date} />
			{props.date === 'Today' &&
				<AddEntry />
			}
			<ul>{entryList}</ul>
			<hr />
		</div>
)}

function DateHeader(props) {
	return <h2 className="dateHeader">{props.date}</h2>
}

function AddEntry(){
	return(
		<div className="AddEntry">Add Entry</div>
	)
}

export default Day;