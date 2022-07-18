import Sidebar from "../components/UI/Sidebar";
import { Container, Row, Col } from "react-bootstrap";

import { Switch, Route } from "react-router-dom";

import UsersTable from "../components/Tables/UsersTable";
import PostsTable from "../components/Tables/PostsTable";

const AdminPage = (props) => {
  return (
    <div>
      <Row>
        <Sidebar></Sidebar>
        <Col>
          <Switch>
            <Route path="/admin/users" component={UsersTable}></Route>
            <Route path="/admin/posts" component={PostsTable}></Route>
          </Switch>
        </Col>
      </Row>
    </div>
  );
};

export default AdminPage;
