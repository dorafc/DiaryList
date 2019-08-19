import React, {Component} from 'react';
import 'firebase/firestore';
import Close from '../Close';

import styled, { css, keyframes } from 'styled-components'
import * as styles from '../../constants/styles.js';

import { ColorCodesContext } from '../KeyTheme';

const initialState = {
	id : '',
	shortText : '',
	longText : '',
	theme : 'make',
	isFuture : false,
	date : new Date(),
}

class EditEntry extends Component {

	constructor(props) {
		super(props);
    this.state = { ...initialState };

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDelete = this.onDelete.bind(this)
	}

  onChange(event){
  	const value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value
  	this.setState({
  		[event.target.name] : value,
  		date : new Date()
  	})
  }

  getData(){
  	const id = this.props.id
		const day = this.props.day
		const db = this.props.firebase.db;
  	const docRef = db.collection('users').doc(this.props.userId).collection('dates').doc(day).collection('notes').doc(id)

  	docRef.get()
  	.then((entry) => {
  		this.setState({
  			id : this.props.id, 
  			shortText : entry.data().shortText,
  			longText : entry.data().longText,
				theme : entry.data().theme,
				isFuture : entry.data().isFuture
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

  componentDidMount(){
  	if (this.props.id !== ''){
  		this.getData()
		}
  }

  componentDidUpdate(prevProps){
  	if (prevProps.id !== this.props.id){
  		this.getData()
  	}
  }

  onSubmit(event){

  	// const { date } = this.state
  	const currentDate = this.state.date

  	// const currentDate = new Date('July 16, 2019 23:00:00')
  	const db = this.props.firebase.db;
  	
  	const year = currentDate.getFullYear()
  	const month = currentDate.getMonth()
  	const monthplus1 = month + 1
  	const date = currentDate.getDate()
  	const zeroPaddedMonth = (monthplus1 < 10) ? '0'+ monthplus1 : monthplus1.toString()

  	const dateDoc = year + "-" + zeroPaddedMonth + "-" + date;

  	// const dateDoc = this.state.date.getFullYear() + "-" + (this.state.gate.getMonth()+1) + "-" + this.state.date.getDate()
  	const day = new Date( currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
  	console.log(year + "-" + zeroPaddedMonth + "-" + date)

  	event.preventDefault();

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

  onEditSubmit(event, day, id){
  	event.preventDefault();
  	const db = this.props.firebase.db;
  	const docRef = db.collection('users').doc(this.props.userId).collection('dates').doc(day).collection('notes').doc(id)

  	return docRef.update({
		    shortText : this.state.shortText,
		    longText : this.state.longText,
		    isFuture : this.state.isFuture,
				theme : this.state.theme,
				isFuture : this.state.isFuture
		})
		.then(() => {
		    console.log("Entry successfully updated!");
		    this.setState({ ...initialState })
		})
		.then(() => {
			this.props.close()
		})
		.catch(function(error) {
		    // The document probably doesn't exist.
		    console.error("Error updating entry: ", error);
		});
  }

  onDelete(event, day, id){
  	event.preventDefault();
  	const db = this.props.firebase.db;
  	const docRef = db.collection('users').doc(this.props.userId).collection('dates').doc(day).collection('notes').doc(id)

  	docRef.delete()
  	.then(() => {
	    console.log("Note successfully deleted!");
	    this.setState({ ...initialState })
		})
		.then(() => {
			this.props.close()
		})
		.catch(function(error) {
	    console.error("Note removing document: ", error);
		});
  }

	render(){
		// editing or writing
		const isEdit = (this.props.id !== '')
		const onSub = (!isEdit) ? this.onSubmit : (e) => {this.onEditSubmit(e, this.props.day, this.props.id)}
		const buttonText = (!isEdit) ? 'Add Note' : 'Save Note'
		const showDelete = (!isEdit) ? '' : <DeleteBtn href="#delete" onClick={(e) => {this.onDelete(e, this.props.day, this.props.id)}}>Delete</DeleteBtn>
		const greeting = (this.props.completed) ? "You did it! Completed!" : "Hello, World!"

		return (
			<EditEntryContainer id="editForm">
				<EditForm onSubmit={onSub}>
					<Close closeThis={this.props.close} />
					<FormGreeting>{greeting}</FormGreeting>
				
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
					{showDelete}
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
	width: 100%;
	height: 100vh;
	z-index: 5;
	animation: ${fadeColor} .3s ease;
`

const EditForm = styled.form`
	background-color: ${styles.pale};
	position: fixed;
	bottom: 0;
	width: 100%;
	padding: 20px 60px;
	animation: ${raiseForm} .35s ease-in;
	color: ${styles.green};

	.close{
		float: right;
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
	width: 400px;
	padding: 5px;
	border-radius: 8px;
	margin: 2px 0 10px 0;
	color: ${styles.green};
`

const LongText = styled.textarea`
	border: solid 2px ${styles.green};
	min-width: 400px;
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

export default EditEntry;