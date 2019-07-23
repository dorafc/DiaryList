import React from 'react';

import styled, { css } from 'styled-components'
import * as styles from '../../constants/styles.js';

function AddEntry(props){
	return(
		<AddButton className="AddEntry" onClick={props.onClick}>
			Add New Entry
		</AddButton>
	)
}

const AddButton = styled.button `
	border-radius: 10px;
	border: solid 3px ${styles.green};
	background-color: transparent;
	color: ${styles.green};
	padding: 20px 100px;
	${'' /* font-weight: 700; */}
	font-size: 19px;
	transition: all .3s ease-in-out;

	:hover{
		${'' /* background-color: ${styles.paleGreen} */}
		border-radius: 0;
		box-shadow: 4px 4px ${styles.lightGreen};
	}

	:active{
		box-shadow: none;
		box-shadow: -4px -4px ${styles.lightGreen};
		outline: none;
	}

	:focus{
		outline: none;
	}
`

export default AddEntry;