import React, {Component} from 'react';

import styled, { css } from 'styled-components'
import * as styles from '../../constants/styles.js';

import EditEntry from '../EditEntry';
import DisplayEntries from '../DisplayEntries';
import AddEntry from '../AddEntry';
// import {ColorCodesContext, colorCodes} from '../KeyTheme';
import { withFirebase } from '../Firebase';

class ViewEntries extends Component {
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
  		showForm = <ShowAddArea><AddEntry onClick={this.handleAddEntry} /></ShowAddArea>
  	}

  	return (
  		<div className="ViewEntries">

        {showForm}
        <DisplayEntryList onEdit={this.handleEditClick} />

		  </div>
  	)
  }
}

// styled components
const ShowAddArea = styled.div`
  margin: 10px 0 40px 0;
  display: flex;
  justify-content: space-around;
`

// higher order components with Firebase
const EditEntryForm = withFirebase(EditEntry);
const DisplayEntryList = withFirebase(DisplayEntries);

export default ViewEntries;