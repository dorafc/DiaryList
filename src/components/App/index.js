import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import * as ROUTES from '../../constants/routes';

import UtilityBar from '../UtilityBar';
import ViewEntries from '../ViewEntries';
import Landing from '../Landing';
import SignIn from '../SignIn';
import { withFirebase } from '../Firebase';
import {ColorCodesContext, colorCodes} from '../KeyTheme';

class App extends Component {
	constructor(props) {
		super(props);
    this.state = {
      colorCodes : colorCodes.codes
    }
    this.setColorCodes = this.setColorCodes.bind(this)
  }

  setColorCodes(color) {
    this.setState({
      colorCodes : color
    })
  }

  // componentDidMount(){
  //   const db = this.props.firebase.db;
  //   const docRef = db.collection('users').doc('dcaswell').collection('themes')

  //   let themes=[]

  //   docRef.get()
  //   .then((entry) => {
  //     entry.forEach(function(doc) {
  //           // doc.data() is never undefined for query doc snapshots
  //           // console.log(doc.id, " => ", doc.data());
  //           themes.push(doc.data())
  //       });
  //   })
  //   .catch(function(error) {
  //     console.log("Error getting document:", error);
  //   })

  //   this.setState({
  //     colorCodes : themes
  //   })
  // }

  render(){
  	return (
      <Router>
    		<div className="app">

    			<ColorCodesContext.Provider value={this.state.colorCodes}>
  			  	<UtilityBarData setColor={this.setColorCodes} />
  		  	</ColorCodesContext.Provider>

          <Route exact path={ROUTES.LANDING} component={Landing} />
          <Route path={ROUTES.SIGNIN} component={SignIn} />
          <ColorCodesContext.Provider value={this.state.colorCodes}>
            <Route path={ROUTES.HOME} component={ViewEntries}/>
          </ColorCodesContext.Provider>

  		  </div>
      </Router>
  	)
  }
}

const UtilityBarData = withFirebase(UtilityBar)
export default App;