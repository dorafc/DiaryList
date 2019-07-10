import React from 'react';

function Entry(props){
	// console.log(props.entry)
	return(
		<li className={"entry "+props.theme}>
			{props.shortText} <a href="#editentry" onClick={(e) => props.onEdit(e, props.id, props.day)}>Edit</a>
		</li>
	)
}

export default Entry;