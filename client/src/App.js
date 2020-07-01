import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import Menu from './components/Menu/Menu';

const App = () => {
  const [dishCreateName, changeDishCreateName] = useState('');
  const [dishDeleteName, changeDishDeleteName] = useState('');
  const [dishOldUpdateName, changeDishOldUpdateName] = useState('');
  const [dishNewUpdateName, changeDishNewUpdateName] = useState('');
  const [menu, modifyMenu] = useState([]);

  const handleDishCreateNameChange = (e) => {
    changeDishCreateName(e.target.value);
  };

  const handleDishDeleteNameChange = (e) => {
    changeDishDeleteName(e.target.value);
  };

  const handleDishOldUpdateNameChange = (e) => {
    changeDishOldUpdateName(e.target.value);
  };

  const handleDishNewUpdateNameChange = (e) => {
    changeDishNewUpdateName(e.target.value);
  };

  useEffect(() => {
    async function getData() {
      await getMenu();
    }

    getData();
  }, []);

  const getMenu = async () => {
    try {
      const response = await axios.get('/api/menu/get');
      modifyMenu(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const saveDish = async () => {
    try {
      const payload = {
        dishName: dishCreateName,
      };
      await axios.post('/api/dish/save', payload);
      await getMenu();
    } catch (e) {
      console.log(e);
    }
  };

  const updateDish = async () => {
    try {
      const payload = {
        oldDishName: dishOldUpdateName,
        newDishName: dishNewUpdateName,
      };
      await axios.post('/api/dish/update', payload);
      await getMenu();
    } catch (e) {
      console.log(e);
    }
  };

  const deleteDish = async () => {
    try {
      const payload = {
        dishName: dishDeleteName,
      };
      await axios.post('/api/dish/delete', payload);
      await getMenu();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <div className="form-container">
          <input type="text" placeholder="Dish name"
                 className="form-input"
                 value={dishCreateName}
                 onChange={handleDishCreateNameChange} />
          <button className="btn form-btn" onClick={saveDish}>Save Dish</button>
        </div>
        <div className="form-container">
          <input type="text" placeholder="Dish name"
                 className="form-input"
                 value={dishOldUpdateName}
                 onChange={handleDishOldUpdateNameChange} />
          <input type="text" placeholder="New dish name"
                 className="form-input"
                 value={dishNewUpdateName}
                 onChange={handleDishNewUpdateNameChange} />
          <button className="btn form-btn" onClick={updateDish}>Update Dish</button>
        </div>
        <div className="form-container">
          <input type="text" placeholder="Dish name"
                 className="form-input"
                 value={dishDeleteName}
                 onChange={handleDishDeleteNameChange} />
          <button className="btn form-btn" onClick={deleteDish}>Delete Dish</button>
        </div>
      </div>
      <Menu menu={menu} />
    </div>
  );
};

export default App;
