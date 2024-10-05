import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Registration from './Registration';

import './App.css';
import './style.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Registration />
      </div>
    </BrowserRouter>
  );
}

export default App;
