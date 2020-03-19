import React from 'react';
import './App.css';
import config from 'react-global-configuration';
import Main from './compnents/Main';
import {BrowserRouter} from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
      {/* App Component Has a Child Component called Main*/}
      <Main/>
  </BrowserRouter>
  );
}

export default App;
