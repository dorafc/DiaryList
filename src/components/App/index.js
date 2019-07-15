import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import * as ROUTES from '../../constants/routes';

import UtilityBar from '../UtilityBar';
import ViewEntries from '../ViewEntries';
import Landing from '../Landing';
import SignIn from '../SignIn';
import {ColorCodesContext, colorCodes} from '../KeyTheme';


class App extends Component {
	constructor(props) {
		super(props);
    this.state = {

    }
  }

  render(){

  	return (
      <Router>
    		<div className="app">

    			<ColorCodesContext.Provider value={colorCodes.codes}>
  			  	<UtilityBar />
  		  	</ColorCodesContext.Provider>

          <Route exact path={ROUTES.LANDING} component={Landing} />
          <Route path={ROUTES.SIGNIN} component={SignIn} />
          <Route path={ROUTES.HOME} component={ViewEntries} />

  		  </div>
      </Router>
  	)
  }
}

export default App;