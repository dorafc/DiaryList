import React from 'react';

function Entry(props){
	// console.log(props.entry)
	return(
		<li className={"entry "+props.theme}>
			{props.shortText} <a href="#editentry" onClick={(e) => props.onEdit(e, true)}>Edit</a>
		</li>
	)
}

export default Entry;