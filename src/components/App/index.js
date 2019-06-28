import React from 'react';

import Day from '../Day'
import Entry from '../Entry'
import UtilityBar from '../UtilityBar'

const App = () => (
  <div className="app">
  	<UtilityBar />
    <Day date="Today" entryCount={2} />
    <Day date="Yesterday" entryCount={5} />
    <Day date="Monday, June 24" entryCount={8} />
  </div>
);

export default App;