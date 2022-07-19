import { Table, Container, Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import {
  Info,
  Edit,
  VisibilityOff,
  Visibility,
  Search,
} from "@mui/icons-material";

import axios from "axios";

import { useEffect, useState, useRef } from "react";

import { API_URL } from "../../api/agent";

const ReportsTable = () => {
  const [reportsData, setReportsData] = useState();

  const searchString = useRef();

  const setAxiosDefaultHeader = () => {
    axios.defaults.headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
  };

  const fetchData = () => {
    return axios.get(`${API_URL}/Reports`).then((response) => {
      console.log(response);
      const reports = response.data.value.map((data) => {
        return (
          <tr key={data.Username}>
            <td>{data.Email}</td>
            <td>{data.Username}</td>
            <td>{data.FirstName}</td>
            <td>{data.LastName}</td>
            <td>
              <Link to={`/admin/users/${data.UserID}/details`}>
                <Info />
              </Link>
              {" | "}
              <Link to={`/admin/users/${data.UserID}/edit`}>
                <Edit></Edit>
              </Link>
              {" | "}
              <Link to={`/admin/users/${data.UserID}/toggle`}>
                <VisibilityOff></VisibilityOff>
              </Link>
            </td>
          </tr>
        );
      });
      setReportsData(reports);
    });
  };

  useEffect(() => {
    setAxiosDefaultHeader();
    fetchData();
  }, []);

  const SubmitHandler = (e) => {
    e.preventDefault();
    return axios
      .get(
        `${API_URL}/reports?$filter=contains(Username, '${searchString.current.value}')`
      )
      .then((response) => {
        console.log(response);
        const reports = response.data.value.map((data) => {
          return (
            <tr key={data.Username}>
              <td>{data.Email}</td>
              <td>{data.Username}</td>
              <td>{data.FirstName}</td>
              <td>{data.LastName}</td>
              <td>
                <Link to={`/admin/users/${data.UserID}/details`}>
                  <Info />
                </Link>
                {" | "}
                <Link to={`/admin/users/${data.UserID}/edit`}>
                  <Edit></Edit>
                </Link>
                {" | "}
                <Link to={`/admin/users/${data.UserID}/toggle`}>
                  <VisibilityOff></VisibilityOff>
                </Link>
              </td>
            </tr>
          );
        });
        setReportsData(reports);
      });
  };

  return (
    <Container>
      <h1
        className="mb-5 mt-3"
        style={{ fontWeight: "bold", fontSize: "2rem" }}
      >
        Reports Management
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
                  ref={searchString}
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
        <tbody>{reportsData && reportsData}</tbody>
      </Table>
    </Container>
  );
};
export default ReportsTable;
