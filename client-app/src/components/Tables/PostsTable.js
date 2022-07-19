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

import { useEffect, useState, useRef } from "react";

import axios from "axios";

import { API_URL } from "../../api/agent";

const PostsTable = () => {
  const [postsData, setPostsData] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [url, setURL] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [numberRecords, setNumberRecords] = useState(3);

  const searchString = useRef();
  const SubmitSearchHandler = (e) => {
    e.preventDefault();
    fetchPagination(
      `${API_URL}/Posts?$filter=contains(Title, '${searchString.current.value}')`
    );
    setURL(
      `${API_URL}/Posts?$filter=contains(Title, '${searchString.current.value}')`
    );
    axios
      .get(
        `${API_URL}/Posts?$filter=contains(Title, '${searchString.current.value}')`
      )
      .then((response) => {
        console.log(response);
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

  const setAxiosDefaultHeader = () => {
    axios.defaults.headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
  };

  const fetchData = () => {
    fetchPagination(
      `${API_URL}/Posts?$skip=${
        pageIndex * numberRecords
      }&$top=${numberRecords}`
    );
    setURL(
      `${API_URL}/Posts?$skip=${
        pageIndex * numberRecords
      }&$top=${numberRecords}`
    );
    return axios
      .get(
        `${API_URL}/Posts?$skip=${
          pageIndex * numberRecords
        }&$top=${numberRecords}`
      )
      .then((response) => {
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

  const fetchPagination = (link) => {
    console.log(link);
    return axios.get(link).then((response) => {
      console.log(response);
      const totalRecord = response.data.length;
      let pageNumber = totalRecord / numberRecords;
      if (totalRecord % numberRecords !== 0) {
        pageNumber++;
      }
      let paginationItems = [];
      for (let i = 0; i < pageNumber - 1; i++) {
        paginationItems.push(
          <Pagination.Item
            key={i}
            onClick={() => {
              setPageIndex(i);
            }}
            active={i === pageIndex}
          >
            {i + 1}
          </Pagination.Item>
        );
      }
      setPagination(paginationItems);
    });
  };

  useEffect(() => {
    setAxiosDefaultHeader();
    fetchData();
    fetchPagination(url);
  }, [pageIndex]);

  return (
    <Container>
      <h1
        className="mb-5 mt-3"
        style={{ fontWeight: "bold", fontSize: "2rem" }}
      >
        Post Management
      </h1>
      <Row className="justify-content-between mb-3">
        <Col xs={2}></Col>
        <Col xs={4}>
          <Form onSubmit={SubmitSearchHandler}>
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
            <th>Title</th>
            <th>Description</th>
            <th>Post time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{postsData && postsData}</tbody>
      </Table>
      <Pagination>{pagination && pagination}</Pagination>
    </Container>
  );
};

export default PostsTable;
