import {
  Table,
  Container,
  Row,
  Button,
  Col,
  Form,
  Pagination,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Info,
  Edit,
  VisibilityOff,
  Visibility,
  Search,
} from "@mui/icons-material";

import { useEffect, useState } from "react";

import axios from "axios";

import { API_URL } from "../../api/agent";

const PostsTable = () => {
  const [postsData, setPostsData] = useState(null);

  const SubmitHandler = (e) => {
    e.preventDefault();
  };

  const setAxiosDefaultHeader = () => {
    axios.defaults.headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
  };

  const fetchData = () => {
    return axios.get(`${API_URL}/Posts`).then((response) => {
      const posts = response.data.map((data) => {
        return (
          <tr key={data.postID}>
            <td>{data.title}</td>
            <td>{data.description}</td>
            <td>{data.uploadTime}</td>
            <td>
              <Link to={`/admin/posts/${data.postID}/details`}>
                <Info />
              </Link>
              {" | "}
              <Link to={`/admin/posts/${data.postID}/edit`}>
                <Edit></Edit>
              </Link>
              {" | "}
              <Link to={`/admin/posts/${data.postID}/toggle`}>
                <VisibilityOff></VisibilityOff>
              </Link>
            </td>
          </tr>
        );
      });
      setPostsData(posts);
    });
  };

  useEffect(() => {
    setAxiosDefaultHeader();
    fetchData();
  }, []);

  return (
    <Container>
      <h1
        className="mb-5 mt-3"
        style={{ fontWeight: "bold", fontSize: "2rem" }}
      >
        Post Management
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
            <th>Title</th>
            <th>Description</th>
            <th>Post time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{postsData && postsData}</tbody>
      </Table>
      <Pagination>
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Next />
      </Pagination>
    </Container>
  );
};

export default PostsTable;
