import React, {Component} from 'react';

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

    const nextLink = (this.state.daysPast > 0) ? <a href="#next" onClick={this.nextDay}>Next</a> : ''

    return(
      <div className="dayPicker">
        <a href="#pref" onClick={this.prevDay}>Prev</a>
        <h4>{dayText}</h4>
        {nextLink}
      </div>
    )
  }
}

export default DayPicker