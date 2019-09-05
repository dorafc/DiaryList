import React, {Component} from 'react';

import styled from 'styled-components'

import EditEntry from '../EditEntry';
import DisplayEntries from '../DisplayEntries';
import AddEntry from '../AddEntry';
import { withFirebase } from '../Firebase';

class ViewEntries extends Component {
	constructor(props) {
		super(props);
    this.state = {

      // value of currently editing 
      id : '',
      day : '',

      // if the current form is showing a completed entry
      completed : false,

      // show future events or all events
      showAll : true
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
  handleEditClick(e, id, day, completed){
  	e.preventDefault()
    this.showForm(id, day, completed)
  }

  // closes edit form
  closeForm(e){
    if (e) {e.preventDefault()}
    this.setState({
      showEditForm : false,
      id : '',
      day : '',
      completed : false
    })
  }

  // show form
  showForm(id, day, completed){
    this.setState({
      showEditForm : true,
      id : id,
      day : day,
      completed: completed
    })
  }

  render(){
  	let showForm = null
  	if (this.state.showEditForm){
  		showForm = <EditEntryForm 
        id={this.state.id}
        day={this.state.day}
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
  
        <DisplayEntries onEdit={this.handleEditClick} showAll={this.props.showAll} userId={this.props.userId} />

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
// const DisplayEntryList = withFirebase(DisplayEntries);

export default ViewEntries;