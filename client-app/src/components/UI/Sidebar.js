import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div style={{ width: "15%", height: "100vh", backgroundColor: "black" }}>
      Onlyfunds
      <Nav navbarScroll as="ul">
        <Nav.Item as="li">
          <Nav.Link to="/admin/users" as={Link}>
            Users
          </Nav.Link>
          <Nav.Link to="/admin/posts" as={Link}>
            Posts
          </Nav.Link>
          <Nav.Link to="/admin/reports" as={Link}>
            Reports
          </Nav.Link>
          <Nav.Link to="/admin/tags" as={Link}>
            Tags
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Sidebar;
