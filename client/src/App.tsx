import React from 'react';
import './App.scss';
import CRUDOperations from "./components/CRUDOperations/CRUDOperations";
import FileUpload from "./components/FileUpload/FileUpload";

const App = () => {
  return (
    <div className="App">
      <CRUDOperations />
      <div className="divider"></div>
      <FileUpload />
    </div>
  );
};

export default App;
