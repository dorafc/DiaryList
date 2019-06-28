import React from 'react';

import Day from '../Day'
import UtilityBar from '../UtilityBar'
import EditEntry from '../EditEntry'

const App = () => (
  <div className="app">
  	<UtilityBar />
  	<EditEntry create={false} />
    <Day date="Today" entryCount={2} />
    <Day date="Yesterday" entryCount={5} />
    <Day date="Monday, June 24" entryCount={8} />
  </div>
);

export default App;