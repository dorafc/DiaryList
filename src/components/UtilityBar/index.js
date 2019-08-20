import React, {Component} from 'react';
import Navigation from '../Navigation';

// import { Route } from "react-router-dom";
import { Link } from 'react-router-dom';

import styled, { css } from 'styled-components'
import * as styles from '../../constants/styles.js';

import * as ROUTES from '../../constants/routes';

class UtilityBar extends Component {

	constructor(props) {
		super(props);
    this.state = {
			keyVisible : false,
		}
	}

	componentDidMount(){
    const db = this.props.firebase.db;
    const docRef = db.collection('users').doc(this.props.userId).collection('themes').where('active', '==', true)

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
		const homeLink = this.props.authUser ? ROUTES.HOME : ROUTES.LANDING

		return(
			<Masthead>
				<Title><Link to={homeLink}>Lifey McLifeface</Link></Title>
				<Navigation setKey={this.props.setKey} authUser={this.props.authUser}/>
			</Masthead>
		)
	}
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

	a:hover{
		${'' /* color: rgba(255,255,255,.8); */}
	}

	a::after{
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
