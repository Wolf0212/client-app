import Sidebar from "../components/UI/Sidebar";
import { Container, Row, Col } from "react-bootstrap";

import { Switch, Route } from "react-router-dom";

import UsersTable from "../components/Tables/UsersTable";
import PostsTable from "../components/Tables/PostsTable";
import ReportsTable from "../components/Tables/ReportsTable";
import TagsTable from "../components/Tables/TagsTable";
// import "./AdminPage.css";

const AdminPage = (props) => {
  return (
    <div>
      <Row>
        <Col md={3}>
          <Sidebar></Sidebar>
        </Col>
        <Col>
          <Switch>
            <Route path="/admin/users" component={UsersTable}></Route>
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
