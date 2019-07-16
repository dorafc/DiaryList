import React, {Component} from 'react';
import 'firebase/firestore';

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
  	// const currentDate = this.state.date

  	const currentDate = new Date('July 16, 2019 23:00:00')
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
  	const docRef = db.collection('users').doc('dcaswell').collection('dates').doc(day).collection('notes').doc(id)

  	return docRef.update({
		    shortText : this.state.shortText,
		    longText : this.state.longText,
		    isFuture : this.state.isFuture,
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
					<div className="isFuture">
						<label> 
							<input type="checkbox" name="isFuture" value={this.state.isFuture} onChange={this.onChange} />	
							For Later?
						</label>
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