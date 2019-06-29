import React from 'react';

import SignIn from '../SignIn'
import {ColorCodesContext, colorCodes} from '../KeyTheme';

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

	// const themes = props.codes.map((theme, i) => {
	// 	return(
	// 		<ColorCodesContext.Consumer>
	// 			{ codes => (
	// 				<li style={{color: theme.color}} key={theme.uid}>{theme.text}</li>
	// 			)}
	// 		</ColorCodesContext.Consumer>
	// 	)
	// })

	return (

			<div className="ShowKey">
				<h3>Key</h3>
				<ul>
					<ColorCodesContext.Consumer>
					{ codes => (
						codes.map((code, i) => (
							<li style={{color: code.color}} key={code.uid}>{code.text}</li>
						)
					))}
					</ColorCodesContext.Consumer>
				</ul>
			</div>
		
	)
}

export default UtilityBar;
