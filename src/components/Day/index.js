import React from 'react';

import Entry from '../Entry'



function setEntryList(count){
	const entryList = []
	for (var i = 0; i < count; i++){
		entryList.push(<Entry />)
	}
	return entryList
}

function Day(props) {
	return (
		<div className="day">
			<DateHeader date={props.date} />
			{setEntryList(props.entryCount)}
			<hr />
		</div>
)}

function DateHeader(props) {
	return <h2 className="dateHeader">{props.date}</h2>
}

export default Day;