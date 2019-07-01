import React, {Component} from 'react';

import Day from '../Day';
import UtilityBar from '../UtilityBar';
import EditEntry from '../EditEntry';
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
		    <Day date="Today" entryCount={2} />
		    <Day date="Yesterday" entryCount={5} />
		    <Day date="Monday, June 24" entryCount={8} />
		  </div>
  	)
  }
}

// higher order components with Firebase
const EditEntryForm = withFirebase(EditEntry);

export default App;