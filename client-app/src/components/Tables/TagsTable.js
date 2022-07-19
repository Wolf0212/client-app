import { Table, Container, Col, Row, Button, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import {
  Info,
  Edit,
  VisibilityOff,
  Visibility,
  Search,
  Circle,
} from "@mui/icons-material";

import axios from "axios";

import { useEffect, useState, useRef } from "react";

import { API_URL } from "../../api/agent";

const TagsTable = () => {
  const [tagsData, setTagsData] = useState(null);

  const searchString = useRef();

  const navigate = useHistory();

  const setAxiosDefaultHeader = () => {
    axios.defaults.headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
  };

  const Delete = (id) => {
    axios.delete(`${API_URL}/Tags/${id}`).then(() => {
      navigate.push("/admin/tags");
    });
  };

  const fetchData = () => {
    return axios.get(`${API_URL}/Tags`).then((response) => {
      console.log(response);
      const reports = response.data.value.map((data) => {
        return (
          <tr key={data.TagID}>
            <td>{data.TagName}</td>
            <td>
              {data.Active ? (
                <Circle style={{ color: "green" }}></Circle>
              ) : (
                <Circle style={{ color: "red" }}></Circle>
              )}
            </td>
            <td>
              <Link to={`/admin/tags/${data.TagID}/details`}>
                <Info />
              </Link>
              {" | "}
              <Link to={`/admin/tags/${data.TagID}/edit`}>
                <Edit></Edit>
              </Link>
              {" | "}
              <Link
                to={`#`}
                onClick={(e) => {
                  e.preventDefault();
                  Delete(data.TagID);
                }}
              >
                <VisibilityOff></VisibilityOff>
              </Link>
            </td>
          </tr>
        );
      });
      setTagsData(reports);
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
        `${API_URL}/tags?$filter=contains(TagName, '${searchString.current.value}')`
      )
      .then((response) => {
        console.log(response);
        const reports = response.data.value.map((data) => {
          return (
            <tr key={data.TagID}>
              <td>{data.TagName}</td>
              <td>
                {data.Active ? (
                  <Circle style={{ color: "green" }}></Circle>
                ) : (
                  <Circle style={{ color: "red" }}></Circle>
                )}
              </td>
              <td>
                <Link to={`/admin/tags/${data.TagID}/details`}>
                  <Info />
                </Link>
                {" | "}
                <Link to={`/admin/tags/${data.TagID}/edit`}>
                  <Edit></Edit>
                </Link>
                {" | "}
                <Link
                  to={`#`}
                  onClick={(e) => {
                    e.preventDefault();
                    Delete(data.TagID);
                  }}
                >
                  <VisibilityOff></VisibilityOff>
                </Link>
              </td>
            </tr>
          );
        });
        setTagsData(reports);
      });
  };

  return (
    <Container>
      <h1
        className="mb-5 mt-3"
        style={{ fontWeight: "bold", fontSize: "2rem" }}
      >
        Tags Management
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
            <th>Tag name</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{tagsData && tagsData}</tbody>
      </Table>
    </Container>
  );
};
export default TagsTable;
