import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

function Navigation(){
	return(
		<nav>
			<ul>
	      <li>
	        <Link to={ROUTES.SIGNUP}>Sign In</Link>
	      </li>
	      <li>
	        <Link to={ROUTES.LANDING}>Landing</Link>
	      </li>
	      <li>
	        <Link to={ROUTES.HOME}>Home</Link>
	      </li>
	    </ul>
		</nav>
	)
}

export default Navigation;