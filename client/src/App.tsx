import React from 'react';
import './App.css';
import CRUDOperations from "./components/CRUDOperations/CRUDOperations";

const App = () => {
  return (
    <div className="App">
      <div className="divider"></div>
      <CRUDOperations />
    </div>
  );
};

export default App;
