import React from 'react';
import './App.css';
import Customers from './components/customers';
import axios from "axios";

const App = () => {
  const saveMenu = async () => {
    try {
      const response = await axios.post('/api/menu/save');
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
      <button className="btn" onClick={saveMenu}>Save Menu1</button>
      <Customers />
    </div>
  );
};

export default App;
