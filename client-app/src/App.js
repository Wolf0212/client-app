import rootStore from './stores/rootStore.js';
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router";
import Homepage from './pages/Homepage.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import { PostDetail } from './pages/PostDetail.js';

export const history = createBrowserHistory();

function App() {
  return (
    <Provider store={rootStore}>
      <ToastContainer />
      <Router history={history}>
        <Switch>
          <Route path={"/post-detail"} component={PostDetail} />
          <Route path={"/login"} component={Login} />
          <Route path={["/", "/homepage"]} component={Homepage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
