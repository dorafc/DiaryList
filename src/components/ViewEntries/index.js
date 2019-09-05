import React, {Component} from 'react';

import styled from 'styled-components'

import EditEntry from '../EditEntry';
import DisplayEntries from '../DisplayEntries';
import AddEntry from '../AddEntry';

class ViewEntries extends Component {
	constructor(props) {
		super(props);
    this.state = {

      // value of currently editing 
      noteRef : '',

      // if the current form is showing a completed entry
      completed : false,
    }

    this.handleAddEntry = this.handleAddEntry.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.closeForm = this.closeForm.bind(this)
    this.showForm = this.showForm.bind(this)
  }

  handleAddEntry(e){
    e.preventDefault()
    this.showForm('', '', false)
  }

  // Toggle showing the edit form
  handleEditClick(e, noteRef, completed){
  	e.preventDefault()
    this.showForm(noteRef, completed)
  }

  // closes edit form
  closeForm(e){
    if (e) {e.preventDefault()}
    this.setState({
      showEditForm : false,
      completed : false
    })
  }

  // show form
  showForm(noteRef, completed){
    this.setState({
      showEditForm : true,
      noteRef : noteRef,
      completed: completed
    })
  }

  render(){
  	let showForm = null
  	if (this.state.showEditForm){
  		showForm = <EditEntry
        noteRef = {this.state.noteRef}
        close={this.closeForm}
        completed={this.state.completed}
        userId={this.props.userId}
      />
  	} else {
  		showForm = <ShowAddArea><AddEntry onClick={this.handleAddEntry} /></ShowAddArea>
    }
    
    
  	return (
  		<div className="ViewEntries">

        {showForm}
  
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

// higher order components with Firebase
// const EditEntryForm = withFirebase(EditEntry);
// const DisplayEntryList = withFirebase(DisplayEntries);

export default ViewEntries;