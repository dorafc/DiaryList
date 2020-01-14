import React, {Component} from 'react';
import Navigation from '../Navigation';

import styled from 'styled-components'
import * as styles from '../../constants/styles.js';

// <UtilityBar> : utility nav for the top of the page
function UtilityBar(props){
		return(
			<Masthead>
				<Title>Lifey McLifeface</Title>
				<Navigation showPref={props.showPref} authUser={props.authUser} />
			</Masthead>
		)
}

// style components
const Masthead = styled.div`
	background-color: ${styles.green};
	color: #fff;
	padding: 12px;
	font-weight: 400;
  box-shadow: 0 1px 2px #bbb;
	z-index: 2;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: middle;

  margin-bottom: 10px;
	position: fixed;
	width: 100%;

	a{
		color: white;
		text-decoration: none;
	}

	a:not(.material-icons)::after{
		display: block;
		content: '';
		background-color: rgba(255,255,255,.6);
		height: 2px;
		width: 0%;
    transition:width .5s ease-out;
	}

	a:hover::after{
		width: 100%;
	}
`
const Title = styled.h1`
	font-weight: 400;
	font-size: 20px;
	line-height: 1em;
	margin: 0;
`

export default UtilityBar;
