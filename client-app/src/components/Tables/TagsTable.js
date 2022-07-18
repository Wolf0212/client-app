import { Table, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const TagsTable = () => {
  return (
    <Container>
      <h1
        className="mb-5 mt-3"
        style={{ fontWeight: "bold", fontSize: "2rem" }}
      >
        Tags Management
      </h1>
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
              <Link to="/admin/tags/details">Details</Link>
              {" | "}
              <Link to="/admin/tags/edit">Edit</Link>
              {" | "}
              <Link to="/admin/tags/toggle">Toggle</Link>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};
export default TagsTable;
