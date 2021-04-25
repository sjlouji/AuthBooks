import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { renderRoutes } from 'react-router-config';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router } from 'react-router-dom';
import  {BrowserRouter}  from  'react-router-dom'
import store from './Store/configureStore';
import  routes from './Route/route.js'
import { Provider } from 'react-redux';

const history = createBrowserHistory();
class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <BrowserRouter >
          <Router history={history}>
            <Fragment >
              {renderRoutes(routes)}
            </Fragment>
          </Router>
        </BrowserRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));