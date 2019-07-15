import React, {Component} from 'react';
import Navigation from '../Navigation';
import { Route } from "react-router-dom";

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
      console.log(themes)
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
			<div className="UtilityBar">
				<h1>Lifey McLifeface</h1>
				<Navigation />
				<Route path={ROUTES.HOME} component={ShowKey} />
				<hr />
			</div>
		)
	}
}

function ShowKey() {
	console.log('boop')
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
