import React, {Component} from 'react';

import UtilityBar from '../UtilityBar';
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
  		<div className="app">
  			<ColorCodesContext.Provider value={colorCodes.codes}>
			  	<UtilityBar />
		  	</ColorCodesContext.Provider>
		  	<EditEntryForm />
		    <DisplayEntryList />
		  </div>
  	)
  }
}

// higher order components with Firebase
const EditEntryForm = withFirebase(EditEntry);
const DisplayEntryList = withFirebase(DisplayEntries);

export default App;