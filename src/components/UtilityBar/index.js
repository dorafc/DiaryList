import React, {Component} from 'react';
import Navigation from '../Navigation';
import { Route } from "react-router-dom";

import styled, { css } from 'styled-components'
import * as styles from '../../constants/styles.js';

import * as ROUTES from '../../constants/routes';

import { ColorCodesContext } from '../KeyTheme';


class UtilityBar extends Component {

	componentDidMount(){
    const db = this.props.firebase.db;
    const docRef = db.collection('users').doc('dcaswell').collection('themes').where('active', '==', true)

    let themes=[]

    docRef.get()
    .then((entry) => {
      entry.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            themes.push(doc.data())
        });
    })
    .then(()=>{
    	this.props.setColor(themes)
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    })

    this.setState({
      colorCodes : themes
    })
  }

	render(){
		return(
			<Masthead>
				<Title>Lifey McLifeface</Title>
				<Navigation />
				<Route path={ROUTES.HOME} component={ShowKey} />
			</Masthead>
		)
	}
}

function ShowKey() {
	return (
			<Key>
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
			</Key>
	)
}

// style components
const Masthead = styled.div`
	background-color: ${styles.green};
	color: #fff;
	padding: 12px;
	font-weight: 400;
  box-shadow: 0 1px 2px #bbb;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: middle;

  margin-bottom: 10px;
`
const Title = styled.h1`
	font-weight: 400;
	font-size: 20px;
	line-height: 1em;
	margin: 0;
`

const Key = styled.div`
	display: none;
`


export default UtilityBar;
