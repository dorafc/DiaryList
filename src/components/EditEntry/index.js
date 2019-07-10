import React, {Component} from 'react';
import 'firebase/firestore';

const initialState = {
	id : '',
	shortText : '',
	longText : '',
	theme : 'make',
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
	  			id : this.props.id, 
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

  componentDidUpdate(prevProps){
  	if (prevProps.id !== this.props.id){
  		const id = this.props.id
  		const day = this.props.day
  		const db = this.props.firebase.db;
	  	const docRef = db.collection('users').doc('dcaswell').collection('dates').doc(day).collection('notes').doc(id)

	  	docRef.get()
	  	.then((entry) => {
	  		this.setState({
	  			id : this.props.id, 
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
  	db.collection('users').doc('dcaswell').collection('dates').doc(dateDoc).collection('notes').doc().set({
  		shortText : this.state.shortText,
			longText : this.state.longText,
			theme : this.state.theme,
			date : this.state.date
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
  	const docRef = db.collection('users').doc('dcaswell').collection('dates').doc(day).collection('notes').doc(id)

  	return docRef.update({
		    shortText : this.state.shortText,
		    longText : this.state.longText,
		    theme : this.state.theme
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
  	const docRef = db.collection('users').doc('dcaswell').collection('dates').doc(day).collection('notes').doc(id)

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
		const buttonText = (!isEdit) ? 'Add Note' : 'Edit Note'
		const showDelete = (!isEdit) ? '' : <a href="#delete" onClick={(e) => {this.onDelete(e, this.props.day, this.props.id)}}>Delete</a>

		return (
			<div className="EditEntry" id="editForm">
				<form onSubmit={onSub}>
					<div className="theme">
						<a href="#closeform" onClick={this.props.close}>Close</a>
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
					<button type="submit" >{buttonText}</button>
					{showDelete}
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