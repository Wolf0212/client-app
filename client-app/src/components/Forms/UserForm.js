import axios from "axios";
import { useEffect, useRef } from "react";
import {
  Form,
  Col,
  Row,
  Image,
  Button,
  Container,
  Badge,
} from "react-bootstrap";

const UserForm = (props) => {
  const username = useRef();
  const password = useRef();
  const confirmpassword = useRef();
  const email = useRef();
  const firstname = useRef();
  const lastname = useRef();

  //   useEffect(() => {
  //     if (!props.isAdd) {
  //       axios
  //         .get("https://localhost:44321/odata/Users/" + props.userId)
  //         .then((response) => {
  //           const userInfo = response.queryable[0];
  //         });
  //     }
  //   });

  function SubmitForm() {}

  return (
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
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
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
                <Form.Control></Form.Control>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>First name</Form.Label>
                <Form.Control></Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Last name</Form.Label>
                <Form.Control></Form.Control>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Username</Form.Label>
                <Form.Control></Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Password</Form.Label>
                <Form.Control></Form.Control>
              </Form.Group>
            </Row>
            <Button>Save Profile</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserForm;
