import React from 'react';

import styled, { css } from 'styled-components'
import * as styles from '../../constants/styles.js';

import { ColorCodesContext } from '../KeyTheme';

function ShowKey(props) {
	return (
		<ColorList>
			<ColorCodesContext.Consumer>
			{ codes => (
				codes.map((code, i) => (
					<ColorItem bgColor={code.color} key={i}>{code.text}</ColorItem>
				))
			)}
			</ColorCodesContext.Consumer>
		</ColorList>
	)
}

const ColorList = styled.ul`
	list-style: none;
	padding: 0;
`
const ColorItem = styled.li`
	background-color: ${props => props.bgColor};
	color: #3f3f3f;
	margin: 0 0 10px 0;
	padding: 7px 10px;
	border-radius: 7px;
	display: flex;
	transition: .3s all ease-out;
	position: relative;
	z-index: 1;
	height: 32px;
`

export default ShowKey;