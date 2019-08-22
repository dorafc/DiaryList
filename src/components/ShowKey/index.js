import React from 'react';

import styled, { css } from 'styled-components'
import * as styles from '../../constants/styles.js';

import { ColorCodesContext } from '../KeyTheme';

function ShowKey(props) {
	return (
		// <Title>Guide to Colors</Title>
		<ColorList>
			<ColorCodesContext.Consumer>
			{ codes => (
				codes.map((code, i) => (
					<li style={{color: code.color}} key={i}>{code.text}</li>
				))
			)}
			</ColorCodesContext.Consumer>
		</ColorList>
	)
}

const Key = styled.div`
	${'' /* border: solid 1px grey; */}
	border-bottom-left-radius: 9px;
	border-bottom-right-radius: 9px;
	box-shadow: 0 1px 2px lightgrey;
	padding: 8px;
	margin-bottom: 10px;
	position: relative;
	background-color: white;

	.close{
		position: absolute;
		right: 8px;
	}
`

const Title = styled.h3`
	font-weight: ${styles.normal};
	margin: 0 0 10px 0;
	font-size: 14px;
`
const ColorList = styled.ul`
	list-style: none;
	${'' /* margin: 0; */}
	padding: 0;
	font-size: 14px;
`

export default ShowKey;