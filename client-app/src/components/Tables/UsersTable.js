import { Table, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const UsersTable = () => {
  return (
    <Table style={{ width: "90%", margin: "0 auto" }}>
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
            <Link to="/admin/users/details">Details</Link>
            {" | "}
            <Link to="/admin/users/edit">Edit</Link>
            {" | "}
            <Link to="/admin/users/toggle">Toggle</Link>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};
export default UsersTable;
