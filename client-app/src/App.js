import rootStore from './stores/rootStore.js';
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router";
import Homepage from './pages/Homepage.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';

export const history = createBrowserHistory();

function App() {

  return (
    <Provider store={rootStore}>
      <Router history={history}>
        <Switch>
          <Route path={"/login"} component={Login} />
          <Route path={"/register"} component={Register} />
          <Route path={["/", "/homepage"]} component={Homepage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
