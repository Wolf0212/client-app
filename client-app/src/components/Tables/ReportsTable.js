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
import { toast } from "react-toastify";

const ReportsTable = () => {
  const [reportsData, setReportsData] = useState();

  const searchString = useRef();

  const setAxiosDefaultHeader = () => {
    axios.defaults.headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
  };

  const SetStatus = (id, status) => {
    axios.patch(`${API_URL}/Reports/${id}`, { Status: status }).then(() => {
      toast.success("OKe");
    });
  };

  const fetchData = () => {
    return axios.get(`${API_URL}/Reports`).then((response) => {
      console.log(response);
      const reports = response.data.value.map((data) => {
        return (
          <tr key={data.ReportID}>
            <td>{data.Description}</td>
            <td>{data.ReportTime}</td>
            <td>{data.ReportType}</td>
            <td>
              <Link
                to={`#`}
                onClick={(e) => {
                  e.preventDefault();
                  SetStatus(data.ReportID, "Unresolved");
                }}
              >
                <Info />
              </Link>
              {" | "}
              <Link
                to={`#`}
                onClick={(e) => {
                  e.preventDefault();
                  SetStatus(data.ReportID, "Resolved");
                }}
              >
                <Edit></Edit>
              </Link>
              {" | "}
              <Link
                to={`#`}
                onClick={(e) => {
                  e.preventDefault();
                  SetStatus(data.ReportID, "Rejected");
                }}
              >
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
        `${API_URL}/reports?$filter=contains(Description, '${searchString.current.value}')`
      )
      .then((response) => {
        console.log(response);
        const reports = response.data.value.map((data) => {
          return (
            <tr key={data.ReportID}>
              <td>{data.Description}</td>
              <td>{data.ReportTime}</td>
              <td>{data.ReportType}</td>
              <td>
                <Link
                  to={`#`}
                  onClick={(e) => {
                    e.preventDefault();
                    SetStatus(data.ReportID, "Unresolved");
                  }}
                >
                  <Info />
                </Link>
                {" | "}
                <Link
                  to={`#`}
                  onClick={(e) => {
                    e.preventDefault();
                    SetStatus(data.ReportID, "Resolved");
                  }}
                >
                  <Edit></Edit>
                </Link>
                {" | "}
                <Link
                  to={`#`}
                  onClick={(e) => {
                    e.preventDefault();
                    SetStatus(data.ReportID, "Rejected");
                  }}
                >
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
        <Col xs={2}></Col>
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
            <th>Description</th>
            <th>Time</th>
            <th>Type</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{reportsData && reportsData}</tbody>
      </Table>
    </Container>
  );
};
export default ReportsTable;
