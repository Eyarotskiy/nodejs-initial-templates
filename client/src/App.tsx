import React from 'react';
import './App.scss';
import CrudOperations from "./components/CRUDOperations/CrudOperations";
import FileUpload from "./components/FileUpload/FileUpload";

const App = () => {
  return (
    <div className="App">
      <CrudOperations />
      <div className="divider"></div>
      <FileUpload />
    </div>
  );
};

export default App;
