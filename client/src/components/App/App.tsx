import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import 'components/App/App.scss';
import Home from 'components/App/Home/Home';
import About from 'components/App/About/About';
import NotFound from 'components/App/NotFound/NotFound';
import Confirmation from 'components/App/Confirmation/Confirmation';

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

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/confirmation" component={Confirmation} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </React.Fragment>
    </Router>
  );
};

export default App;
