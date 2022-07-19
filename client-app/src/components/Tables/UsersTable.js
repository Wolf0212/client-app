import {
  Table,
  Container,
  Col,
  Row,
  Button,
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
  Delete,
} from "@mui/icons-material";

import axios from "axios";

import { useEffect, useState, useRef } from "react";

import { API_URL } from "../../api/agent";

import { useHistory } from "react-router-dom";

const UsersTable = () => {
  const [usersData, setUsersData] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [numberRecords, setNumberRecords] = useState(3);
  const [searchString, setSearchString] = useState("");

  const searchInput = useRef();

  const navigate = useHistory();

  const setAxiosDefaultHeader = () => {
    axios.defaults.headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
  };

  const fetchData = () => {
    return axios
      .get(
        `${API_URL}/Users?$skip=${
          pageIndex * numberRecords
        }&$top=${numberRecords}`
      )
      .then((response) => {
        console.log(response);
        const users = response.data.value.map((data) => {
          return (
            <tr className={!data.Active && "table-danger"} key={data.Username}>
              <td>{data.Email}</td>
              <td>{data.Username}</td>
              <td>{data.FirstName}</td>
              <td>{data.LastName}</td>
              <td>
                <Link to={`/admin/users/${data.UserID}/details`}>
                  <Info />
                </Link>
                {" | "}
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    Delete(data.UserID);
                  }}
                >
                  <VisibilityOff></VisibilityOff>
                </Link>
              </td>
            </tr>
          );
        });
        setUsersData(users);
      });
  };

  const Delete = (id) => {
    console.log(id);
    axios.delete(`${API_URL}/users/${id}`).then((response) => {
      navigate.push(`/admin/users`);
    });
  };

  useEffect(() => {
    setAxiosDefaultHeader();

    if (searchString !== "") {
      FetchSearchData();
      fetchPagination(
        `${API_URL}/users?$filter=contains(Username, '${searchString}')`
      );
    } else {
      fetchData();
      fetchPagination(`${API_URL}/Users`);
    }
  }, [pageIndex, searchString]);

  const FetchSearchData = () => {
    axios
      .get(
        `${API_URL}/users?$filter=contains(Username, '${searchString}')&$skip=${
          pageIndex * numberRecords
        }&$top=${numberRecords}`
      )
      .then((response) => {
        const users = response.data.value.map((data) => {
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
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    Delete(data.UserID);
                  }}
                >
                  <VisibilityOff></VisibilityOff>
                </Link>
              </td>
            </tr>
          );
        });
        setUsersData(users);
      });
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    FetchSearchData();
    setPageIndex(0);
    setSearchString(searchInput.current.value);
  };

  const fetchPagination = async (link) => {
    await axios.get(link).then((response) => {
      const totalRecord = response.data.value.length;
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

  return (
    <Container>
      <h1
        className="mb-5 mt-3"
        style={{ fontWeight: "bold", fontSize: "2rem" }}
      >
        User Management
      </h1>
      <Row className="justify-content-between mb-3">
        <Col xs={2}></Col>
        <Col xs={4}>
          <Form onSubmit={SubmitHandler}>
            <Row>
              <Col xs={8}>
                <Form.Control
                  ref={searchInput}
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
        <tbody>{usersData && usersData}</tbody>
      </Table>
      <Pagination>{pagination && pagination}</Pagination>
    </Container>
  );
};
export default UsersTable;
