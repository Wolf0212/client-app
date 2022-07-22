import React from "react";
import {
  Container,
  Col,
  Row,
  Image,
  Button,
  Badge,
  Form,
} from "react-bootstrap";

import { useState, useEffect, useRef } from "react";

import axios from "axios";

import { API_URL } from "../api/agent";
import { toast } from "react-toastify";

export const ProfileTab = () => {
  const [userProfile, setUserProfile] = useState(null);

  const id = localStorage.getItem("uid");

  const firstNameInput = useRef();
  const lastNameInput = useRef();
  const usernameInput = useRef();
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();
  const avatarUrlInput = useRef();

  let password;

  const tempImageURL =
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80";

  const CheckConfirmPassword = () => {
    return passwordInput.current.value === confirmPasswordInput.current.value;
  };

  const UpdateProfile = (e) => {
    e.preventDefault();
    console.log(password);
    if (CheckConfirmPassword() == true) {
      const payload = {
        firstName: firstNameInput.current.value,
        lastName: lastNameInput.current.value,
        username: usernameInput.current.value,
      };
      if (password !== passwordInput.current.value) {
        console.log("inner");
        payload.password = passwordInput.current.value;
      }
      console.log(payload);
      axios.patch(`${API_URL}/users/${id}`, payload).then(() => {
        toast.success("Update success");
        window.location.reload();
      });
    } else {
      toast.error("Please put the same password in confirm password field");
    }
  };

  const FetchData = () => {
    axios.get(`${API_URL}/Users/${id}`).then((response) => {
      const userInfo = (
        <Container
          className="mt-1 p-5"
          style={{
            width: "100%",
            margin: "0 auto",
            boxShadow: "box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px",
          }}
        >
          <Row>
            <Col>
              <h1
                className="mb-3"
                style={{
                  fontSize: "1.6rem",
                  fontWeight: "bold",
                }}
              >
                User's Information <Badge bg="info">Status</Badge>
              </h1>
              <Form onSubmit={UpdateProfile}>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      disabled
                      defaultValue={response.data.Email}
                    ></Form.Control>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      required
                      ref={firstNameInput}
                      defaultValue={response.data.FirstName}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      required
                      ref={lastNameInput}
                      defaultValue={response.data.LastName}
                    ></Form.Control>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      required
                      ref={usernameInput}
                      defaultValue={response.data.Username}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      ref={passwordInput}
                      required
                      type="password"
                      defaultValue={response.data.Password}
                    ></Form.Control>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Form.Control hidden ref={avatarUrlInput}></Form.Control>
                  </Col>
                  <Form.Group as={Col}>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      ref={confirmPasswordInput}
                      required
                      type="password"
                      defaultValue={response.data.Password}
                    ></Form.Control>
                  </Form.Group>
                </Row>
                <Button className="text-blue-800" type="submit">
                  Save Profile
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      );
      setUserProfile(userInfo);
      password = response.data.Password;
    });
  };

  useEffect(() => {
    FetchData();
  }, []);

  return <>{userProfile && userProfile}</>;
};
