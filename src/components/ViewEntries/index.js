import React, {Component} from 'react';

import styled from 'styled-components'

import EditEntry from '../EditEntry';
import DisplayEntries from '../DisplayEntries';
import AddEntry from '../AddEntry';

// <ViewEntries>: content of the logged in app that contains the entries and ability to add entries
class ViewEntries extends Component {
	constructor(props) {
		super(props);
    this.state = {
      noteRef : '',       // value of currently editing 
      completed : false,  // if the current form is showing a completed entry
    }
  }

  // *** Toggle showing the add entry form
  handleAddEntry = (e) => {
    e.preventDefault()
    this.showForm('', '')
  }

  // *** Toggle showing the edit form
  handleEditClick = (e, noteRef, completed) =>{
  	e.preventDefault()
    this.showForm(noteRef, completed)
  }

  // *** closes edit form
  closeForm = (e) => {
    if (e) {e.preventDefault()}
    this.setState({
      showEditForm : false,
      completed : false
    })
  }

  // *** show add or edit form
  showForm = (noteRef, completed) => {
    this.setState({
      showEditForm : true,
      noteRef : noteRef,
      completed: completed
    })
  }

  render(){    
  	return (
  		<div className="ViewEntries">

        {/* Show Edit form */}
        {this.state.showEditForm && 
          <EditEntry
            noteRef = {this.state.noteRef}
            close={this.closeForm}
            completed={this.state.completed}
            userId={this.props.userId}
          />
        }

        {/* Show Add Entry button */}
        {!this.state.showEditForm && 
          <ShowAddArea><AddEntry onClick={this.handleAddEntry} /></ShowAddArea>
        }
  
        <DisplayEntries
          onEdit={this.handleEditClick} 
          showAll={this.props.showAll} 
          userId={this.props.userId} 
        />

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
export default ViewEntries;