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
    	showEditForm : false,

      // value of currently editing 
      id : '',
      day : ''
    }

    this.handleEditClick = this.handleEditClick.bind(this);
    this.closeForm = this.closeForm.bind(this)
  }

  // Toggle showing the edit form
  handleEditClick(e, passShow, id, day){
  	e.preventDefault()
  	if (id !== undefined){
  		this.setState({
        id: id,
        day: day
      })
  	}

  	let currentShow

  	// override default toggling for showing the form with a parameter
  	if (passShow === undefined){
  		currentShow = !this.state.showEditForm
  	} else {
  		currentShow = passShow
  	}
  	this.setState({showEditForm : currentShow})
  }

  closeForm(){
    this.setState({
      showEditForm : false,
      id : '',
      day : ''
    })
  }

  render(){
  	let showForm = null

  	if (this.state.showEditForm){
  		showForm = <EditEntryForm 
        onClick={this.handleEditClick} 
        id={this.state.id}
        day={this.state.day}
        close={this.closeForm}
      />
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