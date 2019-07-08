import React from 'react';
import { BrowserRouter as Link } from "react-router-dom";

function AddEntry(props){
	return(
		<button className="AddEntry" onClick={props.onClick}>
			Add New Entry
		</button>
	)
}

export default AddEntry;