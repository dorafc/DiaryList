import React, {Component} from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";

import EditEntry from '../EditEntry'

function EditModal({ location }){
	const { state = {} } = location;
  const { modal } = state;

	return (
		<div className={modal ? "modal" : undefined}>
			{modal && <Link to="/">Close</Link>}
			<EditEntry />
		</div>
	)
}

export default EditModal;