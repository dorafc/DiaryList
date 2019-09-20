import React, {Component} from 'react';

import styled from 'styled-components'
import * as styles from '../../constants/styles.js';

class DayPicker extends Component{
  constructor(props) {
		super(props);
    this.state = {
      date : new Date(),
      daysPast : 0
    };

    this.nextDay = this.nextDay.bind(this)
    this.prevDay = this.prevDay.bind(this)
  }

  componentDidMount(){
    const today = new Date()
    this.setState({
      daysPast : Math.round((today - this.props.date)/1000/60/60/24)
    })
  }

  nextDay(event){
    event.preventDefault();

    let newDate = new Date(this.props.date);
    let dayCount = this.state.daysPast
    dayCount-=1

    newDate.setDate(newDate.getDate() + 1)
    this.setState({
      date : newDate,
      daysPast : dayCount
    })
    this.props.setDate(newDate)
  }

  prevDay(event){
    event.preventDefault();

    let newDate = new Date(this.props.date);
    let dayCount = this.state.daysPast
    dayCount+=1

    newDate.setDate(newDate.getDate() - 1)
    this.setState({
      date : newDate,
      daysPast : dayCount
    })
    this.props.setDate(newDate)
  }
  
  render() {
    let dayText = ""
    if (this.state.daysPast === 0){
      dayText = 'Today'
    } else if (this.state.daysPast === 1){
      dayText = 'Yesterday'
    } else {
      dayText = this.props.date.toDateString() + ", " + this.state.daysPast + " days ago"
    }

    const nextLink = (this.state.daysPast > 0) ? <Arrow href="#next" onClick={this.nextDay} className="material-icons arrow_forward">arrow_forward</Arrow> : <EmptyArrow></EmptyArrow>

    return(
      <Picker>
        <Arrow href="#pref" onClick={this.prevDay} className="material-icons arrow_back">arrow_back</Arrow>
        <DateText>{dayText}</DateText>
        {nextLink}
      </Picker>
    )
  }
}

// styled components
const Picker = styled.div`
  border: solid 2px ${styles.green};
	border-radius: 8px;
  background-color: white;
  padding: 7px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const DateText = styled.h4`
  margin: 0;
  padding: 0;
  line-height: 24px;
`
const Arrow = styled.a`
  text-decoration: none;
  color: ${styles.green};
  transition: transform ease .2s;

  &:hover{
    transform: scale(1.15)
  }
  &:active{
    transform: scale(1);
  }
`
const EmptyArrow = styled.div`
  width: 24px;
  height: 24px;
`

export default DayPicker