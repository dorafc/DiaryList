import React from 'react';

function AddEntry(props){
	return(
		<button className="AddEntry" onClick={props.onClick}>
			Add New Entry
		</button>
	)
}

export default AddEntry;