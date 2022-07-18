import Sidebar from "../components/UI/Sidebar";
import { Container, Row, Col } from "react-bootstrap";

import { Switch, Route } from "react-router-dom";

import UsersTable from "../components/Tables/UsersTable";
import PostsTable from "../components/Tables/PostsTable";
import ReportsTable from "../components/Tables/ReportsTable";
import TagsTable from "../components/Tables/TagsTable";
import Report from "../components/Report/Report";
import UserForm from "../components/Forms/UserForm";

const AdminPage = (props) => {
  return (
    <div>
      <Row>
        <Col md={3}>
          <Sidebar></Sidebar>
        </Col>
        <Col>
          <Switch>
            <Route path="/admin/users/form" component={UserForm}></Route>
            <Route path="/admin/users" component={UsersTable}></Route>
            <Route path="/admin/report" component={Report}></Route>
            <Route
              path="/admin/users/:id/details"
              component={UsersTable}
            ></Route>
            <Route path="/admin/users/:id/form" component={UsersTable}></Route>
            <Route
              path="/admin/users/:id/delete"
              component={UsersTable}
            ></Route>
            <Route path="/admin/posts" component={PostsTable}></Route>
            <Route path="/admin/reports" component={ReportsTable}></Route>
            <Route path="/admin/tags" component={TagsTable}></Route>
          </Switch>
        </Col>
      </Row>
    </div>
  );
};

export default AdminPage;
