import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import * as ROUTES from '../../constants/routes';

import UtilityBar from '../UtilityBar';
import Navigation from '../Navigation';
import EditEntry from '../EditEntry';
import DisplayEntries from '../DisplayEntries';
import {ColorCodesContext, colorCodes} from '../KeyTheme';
import { withFirebase } from '../Firebase';


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
          <Navigation />
    			<ColorCodesContext.Provider value={colorCodes.codes}>
  			  	<UtilityBar />
  		  	</ColorCodesContext.Provider>
  		  	<EditEntryForm />
          <Route path={ROUTES.HOME} component={DisplayEntryList} />
  		  </div>
      </Router>
  	)
  }
}

// higher order components with Firebase
const EditEntryForm = withFirebase(EditEntry);
const DisplayEntryList = withFirebase(DisplayEntries);

export default App;