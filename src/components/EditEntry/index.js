import React, {Component} from 'react';

class EditEntry extends Component {
	constructor(props) {
		super(props);
    this.state = {
    	shortText : 'short',
    	longText : 'long',
    	theme : 'make'
    };

    this.updateForm = this.updateForm.bind(this)
	}

  updateForm(event){
  	this.setState({
  		[event.target.name] : event.target.value
  	})
  }

	render(){
		return (
			<div className="EditEntry">
				<form>
					<div className="theme">
						<p>Pick Theme</p>
						<select value={this.state.theme} name="theme" onChange={this.updateForm}>
							<option value="make">Make / Craft</option>
							<option value="care">Self-Care</option>
							<option value="media">Media / Arts</option>
							<option value="community">Community</option>
							<option value="experience">Experience</option>
							<option value="learning">Learning</option>
						</select>
					</div>
					<div className="shortText">
						<input type="text" name="shortText" value={this.state.shortText} onChange={this.updateForm} />
					</div>
					<div className="longText">
						<textarea name="longText" value={this.state.longText} onChange={this.updateForm} />
					</div>
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