import React from 'react';

import styled from 'styled-components'
import * as styles from '../../constants/styles.js';

// <Close> : Close icon for modals or popups
function Close(props) {
  return(
    <CloseLink href="#close" onClick={(e)=>props.closeThis(e,false)} className="material-icons close">
      close
    </CloseLink>
  )
}

const CloseLink = styled.a`
  text-decoration: none;
  color: ${styles.green}
  transition: transform .5s ease-out;
  :hover{
    transform: scale(1.4);
  }
`

export default Close;