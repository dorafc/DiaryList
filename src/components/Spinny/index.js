import React, {Component} from 'react';
import styled, { keyframes } from 'styled-components'
import * as styles from '../../constants/styles.js';

// <Spinny> : Displays an animation for loading screens

class Spinny extends Component{
  render(){
    return(
      <Field>
        <Daisy>
          <Petal />
          <Center />
        </Daisy>
        <Daisy>
          <Petal />
          <Center />
        </Daisy>
        <Daisy>
          <Petal />
          <Center />
        </Daisy>
      </Field>
    )
  }
}

// styled components
const twirly = keyframes`
  from{
    opacity: 0;
    transform: scale(.24) rotate(0deg);
  }
  to {
    opacity: 1;
    transform: scale(.24) rotate(360deg);
  }
`
const Field = styled.div`
  display: flex;
  justify-content: center;
`
const Daisy = styled.div`
  height: 30px;
  width: 30px;
  padding: 20px;
  transform: scale(.24);
  animation: ${twirly} ease-in-out 1s infinite;
  animation-direction: alternate-reverse;
  &:nth-of-type(2){
    animation-delay: .333s;
  }
  &:nth-of-type(3){
    animation-delay: .666s;
  }
`
const Petal = styled.div`
  position: relative;
  left: 50px;
  height: 50px;
  width: 50px;
  background-color: ${styles.lightGreen};
  border-radius: 50%;
  box-shadow: 35px 27px ${styles.lightGreen}, 
              -35px 27px ${styles.lightGreen},
              23px 70px ${styles.lightGreen}, 
              -23px 70px ${styles.lightGreen};
`
const Center = styled.div`
  height: 43px;
  width: 43px;
  background-color: white;
  border-radius: 50%;
  position: relative;
  z-index: 2;
  top: -9px;
  left: 52px;
`
export default Spinny