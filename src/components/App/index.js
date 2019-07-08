import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import * as ROUTES from '../../constants/routes';

import UtilityBar from '../UtilityBar';
import Navigation from '../Navigation';
import EditEntry from '../EditEntry';
import DisplayEntries from '../DisplayEntries';
import AddEntry from '../AddEntry';
import {ColorCodesContext, colorCodes} from '../KeyTheme';
import { withFirebase } from '../Firebase';


class App extends Component {
	constructor(props) {
		super(props);
    this.state = {
    	showEditForm : false
    }

    this.handleEditClick = this.handleEditClick.bind(this);
  }

  // Toggle showing the edit form
  handleEditClick(e, passShow){
  	e.preventDefault()
  	let currentShow
  	if (passShow === undefined){
  		currentShow = !this.state.showEditForm
  	} else {
  		currentShow = passShow
  	}
  	this.setState({showEditForm : currentShow})
  }

  render(){
  	let showForm = null

  	if (this.state.showEditForm){
  		showForm = <EditEntryForm onClick={this.handleEditClick} />
  	} else {
  		showForm = <AddEntry onClick={this.handleEditClick} />
  	}

  	return (
      <Router>
    		<div className="app">
          <Navigation />

    			<ColorCodesContext.Provider value={colorCodes.codes}>
  			  	<UtilityBar />
  		  	</ColorCodesContext.Provider>

          {showForm}
          <hr />
          <DisplayEntryList onEdit={this.handleEditClick} />

  		  </div>
      </Router>
  	)
  }
}

// higher order components with Firebase
const EditEntryForm = withFirebase(EditEntry);
const DisplayEntryList = withFirebase(DisplayEntries);

export default App;