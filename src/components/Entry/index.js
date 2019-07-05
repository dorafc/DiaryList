import React from 'react';

function Entry(props){
	// console.log(props.entry)
	return(
		<li className={"entry "+props.theme}>
			{props.shortText}
		</li>
	)
}

export default Entry;