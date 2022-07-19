import { Col, Row, Container, Form, Image, Badge } from "react-bootstrap";

import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import axios from "axios";

import { API_URL } from "../../api/agent";

const UserDetail = () => {
  const [userDetail, setUserDetail] = useState(null);

  let { id } = useParams();

  const tempImageURL =
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80";

  const setAxiosDefaultHeader = () => {
    axios.defaults.headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
  };

  const FetchData = () => {
    axios.get(`${API_URL}/users/${id}`).then((response) => {
      console.log(response);
      const detail = (
        <Container
          className="mt-3 p-5"
          style={{
            width: "100%",
            margin: "0 auto",
            boxShadow: "box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px",
          }}
        >
          <Row>
            <Col md={3}>
              <Image
                roundedCircle={true}
                src={
                  response.data.AvatarUrl === ""
                    ? tempImageURL
                    : response.data.AvatarUrl
                }
              ></Image>
            </Col>
            <Col style={{ borderLeft: "1px solid gray" }}>
              <h1
                className="mb-3"
                style={{
                  fontSize: "1.6rem",
                  fontWeight: "bold",
                }}
              >
                User's Information <Badge bg="info">Status</Badge>
              </h1>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      disabled={true}
                      value={response.data.Email.toString()}
                    ></Form.Control>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      disabled={true}
                      value={response.data.FirstName.toString()}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      disabled={true}
                      value={response.data.LastName.toString()}
                    ></Form.Control>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      disabled={true}
                      value={response.data.Username.toString()}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      disabled={true}
                      value={response.data.Password.toString()}
                    ></Form.Control>
                  </Form.Group>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      );
      setUserDetail(detail);
    });
  };

  useEffect(() => {
    setAxiosDefaultHeader();
    FetchData();
  }, []);

  return <>{userDetail && userDetail}</>;
};

export default UserDetail;
