import React from 'react';

import SignOutButton from '../SignOut';
import styled from 'styled-components'

const Navigation = ({ authUser, showPref, toggleShowAll }) => (
  <div>{authUser ? <NavigationAuth showPref={showPref} toggleShowAll={toggleShowAll}/> : <NavigationNonAuth />}</div>
);

function NavigationAuth(props){
	return(
		<Nav>
			<NavList>
        <NavListItem>
          <SignOutButton />
        </NavListItem>
				<IconListItem>
					<a href="#showPref" onClick={(e)=>props.showPref(e,true)} className="material-icons setting">settings</a>
				</IconListItem>
	    </NavList>
		</Nav>
	)
}


function NavigationNonAuth(){
	return(
		<Nav>
			<NavList>
	      {/* <NavListItem>
	        <Link to={ROUTES.SIGNIN}>Sign In</Link>
	      </NavListItem> */}
	    </NavList>
		</Nav>
	)
}

// styles
const Nav = styled.nav`
	height: 0;
`

const NavList = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	align-items: middle;
	position: relative;
	top: 4px;
`

const NavListItem = styled.li`
	text-transform: uppercase;
	font-size: 12px;
	letter-spacing: 1px;
	padding-left: 10px;
	line-height: 1em;
`
const IconListItem = styled.li`
	font-size: 12px;
	padding-left: 10px;
	line-height: 1em;
	position: relative;
	top: -6px;
	a {
		transition: transform .4s ease-in-out;
		color: white;
		text-decoration: none;
	}
	a:hover{
		transform: rotate(180deg);
	}
`

export default Navigation;