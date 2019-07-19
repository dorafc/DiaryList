import React, {Component} from 'react';
import Close from '../Close';

import styled, { css } from 'styled-components'
import * as styles from '../../constants/styles.js';

import { ColorCodesContext } from '../KeyTheme';

function ShowKey(props) {
	return (
			<Key>
				<Close closeThis={props.setKey} />
				<Title>Key to Colors</Title>
				<ul>
					<ColorCodesContext.Consumer>
					{ codes => (
						codes.map((code, i) => (
							<li style={{color: code.color}} key={i}>{code.text}</li>
						))
					)}
					</ColorCodesContext.Consumer>
				</ul>
				<hr />
			</Key>
	)
}

const Key = styled.div`
	${'' /* display: none; */}
`

const Title = styled.h3`
	color: hotpink;
`

export default ShowKey;