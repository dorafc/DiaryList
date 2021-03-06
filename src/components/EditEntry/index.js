import React, {Component} from 'react';
import 'firebase/firestore';
import Close from '../Close';
import DayPicker from '../DayPicker'

import styled, { keyframes } from 'styled-components'
import * as styles from '../../constants/styles.js';

import { ColorCodesContext } from '../KeyTheme';
import { withFirebase } from '../Firebase';

import dropdown from '../../images/dropdown.svg'

// Initial state for adding a new entry
const initialState = {
	id : '',
	shortText : '',
	longText : '',
	theme : 'make',
	isFuture : false,
	date : new Date(),
	dateUpdate : false
}

// <EditEntry> : Entry edit form editing or add new components
class EditEntry extends Component {

	constructor(props) {
		super(props);
    this.state = { ...initialState };
	}

	// *** On changing checkboxes, update the state
  onChange = (event) => {
  	const value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value
  	this.setState({
  		[event.target.name] : value
  	})
	}
	
	// *** update date in state
	setDate = (date) => {
		this.setState({
			date : date,
			dateUpdate : true
		})
	}

	// *** submit updated data to db
	onSubmit = (event) => {
		event.preventDefault();
  	const currentDate = this.state.date

  	const db = this.props.firebase.db;
		
		// get current date without time
		const day = new Date( currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
		// convert date to formatted string
		const dateDoc = day.toISOString().slice(0,10)

  	// write date document
  	db.collection('users').doc(this.props.userId).collection('dates').doc(dateDoc).set({
  		date : day
  	})
  	.then(() => {
		    console.log("Date document successfully written!");
		})
		.catch(function(error) {
		    console.error("Error writing document: ", error);
		});

  	// write note document
  	db.collection('users').doc(this.props.userId).collection('dates').doc(dateDoc).collection('notes').doc().set({
  		shortText : this.state.shortText,
			longText : this.state.longText,
			theme : this.state.theme,
			isFuture : this.state.isFuture,
			date : currentDate
  	})
  	.then(() => {
		    console.log("Note document successfully written!");
		    this.setState({ ...initialState })
		})
		.then(() => {
			this.props.close()
		})
		.catch(function(error) {
		    console.error("Error writing note document: ", error);
		});
	}
	
	// *** Delete event from the db
	onDelete = (event)=>{
  	event.preventDefault();
  	const docRef = this.props.noteRef

  	docRef.delete()
  	.then(() => {
	    console.log("Note successfully deleted!");
	    this.setState({ ...initialState })
		})
		.then(() => {
			this.props.close()
		})
		.catch(function(error) {
	    console.error("Error removing document: ", error);
		});
  }

	// *** update form with data from a previous entry
	// TODO : Review scope + performance issues
  getData(noteRef){
  	noteRef.get()
  	.then((entry) => {
  		this.setState({
  			shortText : entry.data().shortText,
  			longText : entry.data().longText,
				theme : entry.data().theme,
				isFuture : entry.data().isFuture,
				date : entry.data().date.toDate()
  		})
		})
		.then(() => {
			if (this.props.completed) {
				this.setState({
					isFuture : false
				})
			}
		})
  	.catch(function(error) {
		  console.log("Error getting document:", error);
		})
	}
	
	// *** Submit an edited entry
	onEditSubmit = (event, noteRef) => {
		event.preventDefault();

		if (!this.state.dateUpdate){
			// date has not changed, update current entry
			return noteRef.update({
		    shortText : this.state.shortText,
		    longText : this.state.longText,
		    isFuture : this.state.isFuture,
				theme : this.state.theme,
			})
			.then(() => {
					console.log("Entry successfully updated!");
					this.setState({ ...initialState })
			})
			.then(() => {
				// close form
				this.props.close()
			})
			.catch(function(error) {
					// The document probably doesn't exist.
					console.error("Error updating entry: ", error);
			});
		}else {
			// Date has changed, remove old version of the note, create a new entry on the correct day
			this.onSubmit(event)
			noteRef.delete()
			.then(() => {
				console.log("Note successfully moved");
			})
			.catch(function(error) {
				console.error("Error removing document: ", error);
			});
		}
  }

  componentDidMount(){
		// if the component has a reference to a note in props, pull data from the note	
  	if (this.props.noteRef){
  		this.getData(this.props.noteRef)
		}
  }

	render(){
		// editing or creating a new entry
		const isEdit = (this.props.noteRef)

		// function to update db on submit, based on editing or creating a new entry
		const onSub = (!isEdit) ? this.onSubmit : (e) => {this.onEditSubmit(e, this.props.noteRef)}

		// text for the button based on if editing or adding
		const buttonText = (!isEdit) ? 'Add Note' : 'Save Note'

		// text for the top of the form if editing or adding
		const greeting = (this.props.completed) ? "You did it! Completed!" : "Hello, World!"

		return (
			<EditEntryContainer id="editForm">
				<EditForm onSubmit={onSub}>
					<Close closeThis={this.props.close} />
					<FormGreeting>{greeting}</FormGreeting>

					<DayPicker setDate={this.setDate} date={this.state.date} />
				
					<Theme>
						<p>Pick Theme</p>
						<Select value={this.state.theme} name="theme" onChange={this.onChange}>
							<ColorCodesContext.Consumer>
								{codes => (
										codes.map((code, i) => 
											<option value={code.name} key={i}>{code.text}</option>
										)
									)
								}
							</ColorCodesContext.Consumer>
						</Select>
					</Theme>
					
					<Label htmlFor="shortText">Whats up?</Label>
					<ShortText type="text" name="shortText" value={this.state.shortText} onChange={this.onChange} />
					

					<div className="longText">
						<Label htmlFor="longText">More details?</Label>
						<LongText name="longText" value={this.state.longText} onChange={this.onChange} />
					</div>
					<div className="isFuture">
						<label> 
							<input type="checkbox" name="isFuture" checked={this.state.isFuture} onChange={this.onChange} />	
							For Later?
						</label>
					</div>
					<SubmitBtn type="submit" >{buttonText}</SubmitBtn>

					{/* Show Delete buttons for Editing Entries */}
					{isEdit &&
						<DeleteBtn href="#delete" onClick={(e) => {this.onDelete(e, this.props.noteRef)}}>Delete</DeleteBtn>
					}
				</EditForm>
			</EditEntryContainer>
		)
	}
}

// styles

const fadeColor =  keyframes` 
  0%{opacity: 0;}
  100%{opacity: 1;}
`
const raiseForm = keyframes`
	0%{bottom: -100%}
	100%{bottom: 0}
`

const EditEntryContainer = styled.div`
	background-color: rgba(0,0,0,.7);
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	z-index: 5;
	animation: ${fadeColor} .3s ease;
`

const EditForm = styled.form`
	background-color: ${styles.pale};
	position: fixed;
	bottom: 0;
	width: 100vw;
	padding: 20px 60px;
	animation: ${raiseForm} .35s ease-in;
	color: ${styles.green};

	.close{
		float: right;
	}

	@media (max-width: 375px){
		padding: 20px;
	}
`

const Theme = styled.div`
	margin: 10px 0;
	p{
		margin: 0;
	}
`

const Select = styled.select`
	display: block;
	background-color: white;
	background: url(${dropdown}) no-repeat white 100% 50%;
	width: 200px;
	padding: 7px;
	font-size: 16px;
	font-weight: ${styles.normal};
	font-weight: ${styles.bold};
	color: ${styles.green};
	box-sizing: border-box;
	appearance: none;
	border: solid 2px ${styles.green};
	border-radius: 8px;
	box-shadow: 2px 2px ${styles.lightGreen};

	::after{
		content: '';
		display: block;
		height: 10px;
		width: 10px;
		background-color: red;
	}
`

const FormGreeting = styled.h3`
	color: ${styles.green};
`

const SubmitBtn = styled.button`
	background-color: ${styles.green};
	padding: 10px 20px;
	color: white;
	border: none;
	border-radius: 8px;
	font-weight: ${styles.bold};
	box-shadow: 4px 4px ${styles.lightGreen};
	margin: 10px 0;
	transition: all .3s ease-in-out;

	:hover{
		border-radius: 0;
		box-shadow: -4px -4px ${styles.lightGreen};
	}

	:active{
		border-radius: 0;
		box-shadow: -4px -4px ${styles.lightGreen};
		transform: translate(2px, 2px);
	}

	:focus{
		outline: none;
	}
`

const ShortText = styled.input`
	border: solid 2px ${styles.green};
	width: 100%;
	padding: 5px;
	border-radius: 8px;
	margin: 2px 0 10px 0;
	color: ${styles.green};
`

const LongText = styled.textarea`
	border: solid 2px ${styles.green};
	min-width: 100%;
	min-height: 150px;
	padding: 5px;
	border-radius: 8px;
	margin: 2px 0 10px 0;
	resize: none;
`	
const Label = styled.label`
	display: block;
`

const DeleteBtn = styled.a`
	display: inline-block;
	font-weight: ${styles.bold};
	margin-left: 10px;
	color: ${styles.green};
	transition: all .2s ease-in-out;
	:hover{
		transform: translate(2px, 2px);
	}
`

export default withFirebase(EditEntry);