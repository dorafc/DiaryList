import React, {Component} from 'react';
// import Firebase from '../Firebase';

// const entryDate = new Date();
// const dayEntry = entryDate.toISOString().slice(0,10)

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

  onSubmit(event){
  	const db = this.props.firebase.db;
  	const dateDoc = this.state.date.toISOString().slice(0,10);

  	event.preventDefault();

  	db.collection('users').doc('dcaswell').collection('dates').doc(dateDoc).collection('notes').doc().set(this.state)
  	.then(() => {
		    console.log("Document successfully written!");
		    this.setState({ ...initialState })
		})
		.catch(function(error) {
		    console.error("Error writing document: ", error);
		});
  }

	render(){
		return (
			<div className="EditEntry">
				<form onSubmit={this.onSubmit}>
					<div className="theme">
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
					<button type="submit">Add Note</button>
				</form>
				<hr />
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