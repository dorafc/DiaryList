import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import * as ROUTES from '../../constants/routes';

import UtilityBar from '../UtilityBar';
import ViewEntries from '../ViewEntries';
import Landing from '../Landing';
import SignIn from '../SignIn';
import { withFirebase } from '../Firebase';
import {ColorCodesContext, colorCodes} from '../KeyTheme';
import ShowKey from '../ShowKey';

class App extends Component {
	constructor(props) {
		super(props);
    this.state = {
      colorCodes : colorCodes.codes,
      keyVisible : false,
    }
    this.setColorCodes = this.setColorCodes.bind(this)
    this.showKey = this.showKey.bind(this)
  }

  setColorCodes(color) {
    this.setState({
      colorCodes : color
    })
  }

  showKey(e, isVis){
    e.preventDefault()
		this.setState({
			keyVisible : isVis
		})
	}

  render(){
    const key = (this.state.keyVisible) ? <ShowKey setKey={this.showKey} /> : ''

  	return (
      <Router>
    		<div className="app">

    			<ColorCodesContext.Provider value={this.state.colorCodes}>
  			  	<UtilityBarData setColor={this.setColorCodes} setKey={this.showKey} />
            {key}
  		  	</ColorCodesContext.Provider>

          <Route exact path={ROUTES.LANDING} component={Landing} />
          <Route path={ROUTES.SIGNIN} component={SignIn} />
          <ColorCodesContext.Provider value={this.state.colorCodes}>
            <Route path={ROUTES.HOME} component={ViewEntries}/>
          </ColorCodesContext.Provider>

  		  </div>
      </Router>
  	)
  }
}

const UtilityBarData = withFirebase(UtilityBar)
export default App;