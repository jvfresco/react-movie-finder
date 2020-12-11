import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';


const app = (
  <Router>
    <Switch>
      <Route path="/movie/:movieId" render={() => <App />} />
      <Route path="/" render={() => <App />} />
    </Switch>
  </Router>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
