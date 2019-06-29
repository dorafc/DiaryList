import React from 'react';

import SignIn from '../SignIn'

function UtilityBar(props) {
	return(
		<div className="UtilityBar">
			<h1>Lifey McLifeface</h1>
			<SignIn />
			<ShowKey codes={props.codes} />
			<hr />
		</div>
	)
}

function ShowKey(props) {
	const themes = props.codes.map((theme, i) => {
		return(
			<li style={{color: theme.color}} key={theme.uid}>{theme.text}</li>
		)
	})
	return (
		<div className="ShowKey">
			<h3>Key</h3>
			<ul>
				{themes}
			</ul>
		</div>
	)
}

export default UtilityBar;
