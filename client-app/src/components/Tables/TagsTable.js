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
      window.location.reload();
    });
  };

  const EditUnvisual = (id) => {
    var tagName = document.getElementById("tagName" + id);
    var form = document.getElementById("form" + id);

    form.hidden = true;
    tagName.hidden = false;
  };

  const fetchData = () => {
    return axios.get(`${API_URL}/Tags`).then((response) => {
      console.log(response);
      const reports = response.data.value.map((data) => {
        return (
          <tr key={data.TagID}>
            <td>
              <span id={`tagName${data.TagID}`}>{data.TagName}</span>
              <Form
                hidden
                id={`form${data.TagID}`}
                onSubmit={(e) => {
                  e.preventDefault();
                  ChangeNameHandler(data.TagID);
                }}
              >
                <Row>
                  <Col md={6}>
                    <Form.Control
                      id={`input${data.TagID}`}
                      type="text"
                      placeholder="Enter Tag name"
                      required
                    ></Form.Control>
                  </Col>
                  <Col>
                    <Button type="submit" as="button">
                      Save
                    </Button>{" "}
                    <Button type="button" onClick={EditUnvisual}>
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Form>
            </td>
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
              <Link
                to={`#`}
                onClick={(e) => {
                  e.preventDefault();
                  EditVisual(data.TagID);
                }}
              >
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

  const EditVisual = (id) => {
    var tagName = document.getElementById("tagName" + id);
    var form = document.getElementById("form" + id);

    tagName.hidden = true;
    form.hidden = false;
  };

  const ChangeNameHandler = (id) => {
    var input = document.getElementById("input" + id);
    axios
      .patch(`${API_URL}/Tags/${id}`, { tagName: `${input.value}` })
      .then(() => {
        window.location.reload();
      });
  };

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
              <td>
                <span id={`tagName${data.TagID}`}>{data.TagName}</span>
                <Form
                  hidden
                  id={`form${data.TagID}`}
                  onSubmit={(e) => {
                    e.preventDefault();
                    ChangeNameHandler(data.TagID);
                  }}
                >
                  <Row>
                    <Col md={6}>
                      <Form.Control
                        required
                        id={`input${data.TagID}`}
                        type="text"
                        placeholder="Enter Tag name"
                      ></Form.Control>
                    </Col>
                    <Col>
                      <Button type="submit">Save</Button>{" "}
                      <Button type="button" onClick={EditUnvisual}>
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </td>
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
                <Link
                  to={`#`}
                  onClick={(e) => {
                    e.preventDefault();
                    EditVisual(data.TagID);
                  }}
                >
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

  const ShowForm = () => {
    const button = document.getElementById("addbutton");
    const form = document.getElementById("addform");

    button.hidden = true;
    form.hidden = false;
  };

  const HideForm = () => {
    const button = document.getElementById("addbutton");
    const form = document.getElementById("addform");

    form.hidden = true;
    button.hidden = false;
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
        <Col xs={4}>
          <Button
            id="addbutton"
            onClick={(e) => {
              e.preventDefault();
              ShowForm();
            }}
            as={Link}
            to="#"
            variant="primary"
          >
            +Add new
          </Button>
          <Form hidden id="addform">
            <Row>
              <Form.Control as={Col} placeholder="Add new tag"></Form.Control>
              <Col>
                <Button>Add</Button>{" "}
                <Button
                  as={Link}
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    HideForm();
                  }}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
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
