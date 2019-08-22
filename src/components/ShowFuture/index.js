import React, {Component} from 'react';
import styled, { css } from 'styled-components'
import * as styles from '../../constants/styles.js';

class ShowFuture extends Component{
  render(){
    return(
      <div className="filters">
        <button onClick={this.props.toggleShowAll}>{this.props.btnText}</button>
      </div>
    )
  }
}

export default ShowFuture;