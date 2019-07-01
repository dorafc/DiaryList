import React from 'react';

import SignIn from '../SignIn'
import { ColorCodesContext } from '../KeyTheme';

function UtilityBar(props) {
	return(
		<div className="UtilityBar">
			<h1>Lifey McLifeface</h1>
			<SignIn />
			<ShowKey />
			<hr />
		</div>
	)
}

function ShowKey() {

	return (

			<div className="ShowKey">
				<h3>Key</h3>
				<ul>
					<ColorCodesContext.Consumer>
					{ codes => (
						codes.map((code, i) => (
							<li style={{color: code.color}} key={i}>{code.text}</li>
						))
					)}
					</ColorCodesContext.Consumer>
				</ul>
			</div>
		
	)
}

export default UtilityBar;
