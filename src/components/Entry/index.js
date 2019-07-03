import React from 'react';

function Entry(props){
	// console.log(props.entry)
	return(
		<li className="entry">
			{props.entry.shortText}
		</li>
	)
}

export default Entry;