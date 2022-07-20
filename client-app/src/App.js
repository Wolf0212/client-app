import rootStore from "./stores/rootStore.js";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router";
import Homepage from "./pages/Homepage.js";
import AdminPage from "./pages/AdminPage.js";
import Login from "./pages/Login.js";
import { ToastContainer } from "react-toastify";
import React from "react";
import PostDetail  from "./pages/PostDetail.js";
import { PostForm } from "./pages/PostForm.js";
import { Profile } from "./pages/Profile.js";

export const history = createBrowserHistory();

function App() {
  return (
    <Provider store={rootStore}>
      <ToastContainer />
      <Router history={history}>
        <Switch>
          <Route
            path={["/post-form/create", "/post-form/edit/:id"]}
            component={PostForm}
          />
          <Route path={"/profile"} component={Profile} />
          <Route path={"/post-detail/:id"} component={PostDetail} />
          <Route path={"/login"} component={Login} />
          <Route path={"/admin"} component={AdminPage} />
          <Route path={["/", "/homepage"]} component={Homepage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
