import React from 'react';

function Entry(props){
	const future = (props.isFuture) ? 'isFuture' : ''
	return(
		<li className={"entry "+props.theme+" "+future}>
			{props.shortText} <a href="#editentry" onClick={(e) => props.onEdit(e, props.id, props.day)}>Edit</a>
		</li>
	)
}

export default Entry;