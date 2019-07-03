import React, {Component} from 'react';

import Entry from '../Entry'
// import AddEntry from '../AddEntry'

class Day extends Component {

	render(){

		// console.log(this.props.data)
		const entryList = this.props.data.map((info, i) => 
			<Entry key={"entry"+i} entry={info} />
		)

		return (
			<div className="day">
				<DateHeader date={this.props.date} />
				{this.props.date === 'Today' &&
					<AddEntry />
				}
				<ul>{entryList}</ul>
				<hr />
			</div>
		)
	}
}

function DateHeader(props) {
	return <h2 className="dateHeader">{props.date}</h2>
}

function AddEntry(){
	return(
		<div className="AddEntry">Add Entry</div>
	)
}


export default Day;