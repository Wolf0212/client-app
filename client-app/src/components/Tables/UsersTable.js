import { Table, Container, Col, Row, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import {
  Info,
  Edit,
  VisibilityOff,
  Visibility,
  Search,
} from "@mui/icons-material";

import axios from "axios";

import { useEffect } from "react";

const UsersTable = () => {
  const setAxiosDefaultHeader = () => {
    axios.defaults.headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
  };

  useEffect(() => {
    setAxiosDefaultHeader();
  });

  const SubmitHandler = () => {};

  return (
    <Container>
      <h1
        className="mb-5 mt-3"
        style={{ fontWeight: "bold", fontSize: "2rem" }}
      >
        User Management
      </h1>
      <Row className="justify-content-between mb-3">
        <Col xs={2}>
          <Button as={Link} to="/admin/posts/create" variant="primary">
            +Add new
          </Button>
        </Col>
        <Col xs={4}>
          <Form onSubmit={SubmitHandler}>
            <Row>
              <Col xs={8}>
                <Form.Control
                  type="text"
                  placeholder="Search post with name.."
                ></Form.Control>
              </Col>
              <Col xs={4}>
                <Button className="text-teal-800" variant="info" type="submit">
                  <Search></Search>
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Username</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>phamsn2001@gmail.com</td>
            <td>PhamSon</td>
            <td>TranPham</td>
            <td>KimSon</td>
            <td>
              <Link to={`/admin/users/${1}/details`}>
                <Info />
              </Link>
              {" | "}
              <Link to={`/admin/users/${1}/edit`}>
                <Edit></Edit>
              </Link>
              {" | "}
              <Link to={`/admin/users/${1}/toggle`}>
                <VisibilityOff></VisibilityOff>
              </Link>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};
export default UsersTable;
