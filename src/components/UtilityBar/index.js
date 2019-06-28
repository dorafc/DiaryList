import React from 'react';

import SignIn from '../SignIn'

function UtilityBar() {
	return(
		<div className="UtilityBar">
			<h1>Lifey McLifeface</h1>
			<SignIn />
			<ShowKey />
			<hr />
		</div>
	)
}

const ShowKey = () => {
	return (
		<div className="ShowKey">
			<h3>Key</h3>
			<ul>
				<li>Theme</li>
			</ul>
		</div>
	)
}

export default UtilityBar;
export { ShowKey }