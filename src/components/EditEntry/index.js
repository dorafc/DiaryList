import React, {Component} from 'react';
import 'firebase/firestore';

const initialState = {
	shortText : '',
	longText : '',
	theme : 'make',
	date : new Date()
}

class EditEntry extends Component {

	constructor(props) {
		super(props);
    this.state = { ...initialState };

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
	}

  onChange(event){
  	this.setState({
  		[event.target.name] : event.target.value,
  		date : new Date()
  	})
  }

  componentDidMount(){
  	if (this.props.id !== ''){
  		const id = this.props.id
  		const day = this.props.day
  		const db = this.props.firebase.db;
	  	const docRef = db.collection('users').doc('dcaswell').collection('dates').doc(day).collection('notes').doc(id)

	  	docRef.get()
	  	.then((entry) => {
	  		this.setState({
	  			shortText : entry.data().shortText,
	  			longText : entry.data().longText,
	  			theme : entry.data().theme
	  		})
	  	})
	  	.catch(function(error) {
			  console.log("Error getting document:", error);
			})
  	}
  }

  onSubmit(event){
  	const db = this.props.firebase.db;
  	const dateDoc = this.state.date.toISOString().slice(0,10);
  	const day = new Date( this.state.date.getFullYear(), this.state.date.getMonth(), this.state.date.getDay())

  	event.preventDefault();

  	// write date document
  	db.collection('users').doc('dcaswell').collection('dates').doc(dateDoc).set({
  		date : day
  	})
  	.then(() => {
		    console.log("Date document successfully written!");
		})
		.catch(function(error) {
		    console.error("Error writing document: ", error);
		});

  	// write note document
  	db.collection('users').doc('dcaswell').collection('dates').doc(dateDoc).collection('notes').doc().set(this.state)
  	.then(() => {
		    console.log("Note document successfully written!");
		    this.setState({ ...initialState })
		})
		.catch(function(error) {
		    console.error("Error writing note document: ", error);
		});
  }

  onEditSubmit(event, day, id){
  	event.preventDefault();
  	const db = this.props.firebase.db;
  	const docRef = db.collection('users').doc('dcaswell').collection('dates').doc(day).collection('notes').doc(id)

  	return docRef.update({
		    shortText : this.state.shortText,
		    longText : this.state.longText,
		    theme : this.state.theme
		})
		.then(function() {
		    console.log("Entry successfully updated!");
		})
		.catch(function(error) {
		    // The document probably doesn't exist.
		    console.error("Error updating entry: ", error);
		});
  }

	render(){
		// editing or writing
		const onSub = (this.props.id === '') ? this.onSubmit : (e) => {this.onEditSubmit(e, this.props.day, this.props.id)}
		const buttonText = (this.props.id === '') ? 'Add Note' : 'Edit Note'

		return (
			<div className="EditEntry">
				<form onSubmit={onSub}>
					<div className="theme">
						<a href="#closeform" onClick={this.props.onClick}>Close</a>
						<p>Pick Theme</p>
						<select value={this.state.theme} name="theme" onChange={this.onChange}>
							<option value="make">Make / Craft</option>
							<option value="care">Self-Care</option>
							<option value="media">Media / Arts</option>
							<option value="community">Community</option>
							<option value="experience">Experience</option>
							<option value="learning">Learning</option>
						</select>
					</div>
					<div className="shortText">
						<input type="text" name="shortText" value={this.state.shortText} onChange={this.onChange} />
					</div>
					<div className="longText">
						<textarea name="longText" value={this.state.longText} onChange={this.onChange} />
					</div>
					<button type="submit">{buttonText}</button>
				</form>
			</div>
		)
	}
}

// LOOK AT LATER

// function Delete(){
// 	return(
// 		<div className="Delete">
// 			<a href="#delete">Delete</a>
// 		</div>
// 	)
// }
export default EditEntry;