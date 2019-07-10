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

      // value of currently editing 
      id : '',
      day : ''
    }

    this.handleAddEntry = this.handleAddEntry.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.closeForm = this.closeForm.bind(this)
    this.showForm = this.showForm.bind(this)
  }

  handleAddEntry(e){
    e.preventDefault()

    this.showForm('', '')
  }

  // Toggle showing the edit form
  handleEditClick(e, id, day){
  	e.preventDefault()
  	
    this.showForm(id, day)
  }

  // closes edit form
  closeForm(){
    this.setState({
      showEditForm : false,
      id : '',
      day : ''
    })
  }

  // show form
  showForm(id, day){
    this.setState({
      showEditForm : true,
      id : id,
      day : day
    })
  }

  render(){
  	let showForm = null

  	if (this.state.showEditForm){
  		showForm = <EditEntryForm 
        id={this.state.id}
        day={this.state.day}
        close={this.closeForm}
      />
  	} else {
  		showForm = <AddEntry onClick={this.handleAddEntry} />
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