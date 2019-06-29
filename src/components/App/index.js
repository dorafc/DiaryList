import React, {Component} from 'react';

import Day from '../Day';
import UtilityBar from '../UtilityBar';
import EditEntry from '../EditEntry';

class App extends Component {
	constructor(props) {
		super(props);
    this.state = {
    	codes : [
				{
					uid : 0,
					name : 'make',
					text : 'Make / Craft',
					color : 'teal'
				},
				{
					uid : 1,
					name : 'care',
					text : 'Self Care',
					color : 'gray'
				},
				{
					uid : 2,
					name : 'media',
					text : 'Media / Arts',
					color : 'hotpink'
				},
				{
					uid : 3,
					name : 'community',
					text : 'Community',
					color : 'limegreen'
				},
				{
					uid : 4,
					name : 'experience',
					text : 'Experience',
					color : 'orange'
				},
				{
					uid : 5,
					name : 'learning',
					text : 'Learning',
					color : 'mediumvioletred'
				}
			],

			/*notes : {
				date : 'Today',
				notes :[{
					tagID : 2,
					future : false,
					shortText : 'Did a Thing',
					longText : ''
				},
				{
					tagID : 3,
					future : false,
					shortText : 'Did another Thing',
					longText : 'Beep Boop'
				}]
			}*/
    }
  }

  render(){
  	return (
  		<div className="app">
		  	<UtilityBar codes={this.state.codes} />
		  	<EditEntry create={false} />
		    <Day date="Today" entryCount={2} />
		    <Day date="Yesterday" entryCount={5} />
		    <Day date="Monday, June 24" entryCount={8} />
		  </div>
  	)
  }
}

export default App;