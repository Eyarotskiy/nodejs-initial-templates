import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.scss';
import About from './components/About/About';
import Home from './components/Home/Home';

const App = () => {
  return (
    <Router>
      <React.Fragment>
        <div className="App">
          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
          </nav>

          <div className="divider dashed"></div>

          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </div>
      </React.Fragment>
    </Router>
  );
};

export default App;
