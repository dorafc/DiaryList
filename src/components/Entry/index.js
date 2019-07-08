import React from 'react';

function Entry(props){
	// console.log(props.entry)
	return(
		<li className={"entry "+props.theme}>
			{props.shortText} <a href="#editentry" onClick={(e) => props.onEdit(e, true, props.shortText, props.longText, props.theme, props.id, props.day)}>Edit</a>
		</li>
	)
}

export default Entry;