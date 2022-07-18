import { Table, Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Info, Edit, VisibilityOff, Visibility } from "@mui/icons-material";

const PostsTable = () => {
  return (
    <Container>
      <h1
        className="mb-5 mt-3"
        style={{ fontWeight: "bold", fontSize: "2rem" }}
      >
        Post Management
      </h1>
      <Row>
        <Button className="text-blue-800" variant="primary">
          Primary
        </Button>
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
        <tbody>
          <tr>
            <td>phamsn2001@gmail.com</td>
            <td>PhamSon</td>
            <td>TranPham</td>
            <td>KimSon</td>
            <td>
              <Link to="/admin/posts/details">
                <Info />
              </Link>
              {" | "}
              <Link to="/admin/posts/edit">
                <Edit></Edit>
              </Link>
              {" | "}
              <Link to="/admin/posts/toggle">
                <VisibilityOff></VisibilityOff>
              </Link>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default PostsTable;
