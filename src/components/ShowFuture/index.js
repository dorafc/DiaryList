import React, {Component} from 'react';
import styled, { css } from 'styled-components'
import * as styles from '../../constants/styles.js';

class ShowFuture extends Component{
  constructor(props) {
		super(props);
    this.state = {
      showFuture : false
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(event){
  	const value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value
  	this.setState({
  		[event.target.name] : value,
    })
    this.props.toggleShowAll()
  }

  render(){
    return(
      <div className="filters">
        <p>Show only future events?</p>
        <ToggleWrapper>
          <CheckToggle id="showFuture" name="showFuture" type="checkbox" checked={this.state.showFuture} onChange={this.onChange} />
          <LabelToggle htmlFor="showFuture"></LabelToggle>
          <Toggle></Toggle>
        </ToggleWrapper>
      </div>
    )
  }
}

// styles
const ToggleWrapper = styled.div`
  position: relative;
`
const LabelToggle = styled.label`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 80px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  z-index: 10;
  &:before {
    font-weight: ${styles.bold};
    position: absolute;
    top: 0;
    bottom: 0;
    right: 10px;
    content: 'No';
    color: ${styles.green};
    opacity: 1;
    
    input:checked + & {
      opacity: 0;
    }
  }
  &:after {
    font-weight: ${styles.bold};
    position: absolute;
    top: 0;
    bottom: 0;
    left: 10px;
    content: 'Yes';
    color: ${styles.green};
    opacity: 0;
    
    input:checked + & {
      opacity: 1;
    }
  }
  
`
const CheckToggle = styled.input`
  display: none;
`
const Toggle = styled.div`
  width: 80px;
  height: 30px;
  border: solid 2px ${styles.green};
  border-radius:15px;
  background-color: white;
  position: relative;
  box-shadow: 4px 4px ${styles.lightGreen};
  &:before {
    content:"";
    position:absolute;
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: ${styles.green};
    top: 3px;
    left: 3px;
    transition: left .2s ease-in-out
  }

  input:checked ~ &{
    &:before {
      left: 53px;
    }
  }
`

export default ShowFuture;