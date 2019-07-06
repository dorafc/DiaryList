import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";

function AddEntry(){
	return(
		<Link to={{
			pathname: "/form", 
			state: {modal: true}
		}} className="AddEntry"
		>
			+
		</Link>
	)
}

export default AddEntry;