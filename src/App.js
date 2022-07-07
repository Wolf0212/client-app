import rootStore from './stores/rematch/rootStore';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { Index } from './pages/Index';

export const history = createBrowserHistory();

function App() {
  return (
    <Provider store={rootStore}>
      <ToastContainer />
      <Router history={history}>
        <Switch>
          <Route path="/" component={index} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
