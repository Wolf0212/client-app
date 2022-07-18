import { Card, Row, Col, Button } from "react-bootstrap";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

const Report = (props) => {
  return (
    <Card style={{ width: "70%", margin: "0 auto" }}>
      <Card.Header>
        <Row>
          <Col>Report's title</Col>
          <Col>Unprocessed</Col>
          <Col>Processing</Col>
          <Col>Processed</Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Card.Title>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          Username's
        </Card.Title>
        <Card.Text>Lorem ipsum dolor sit amet, consectetur adip</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Row>
          <Col>
            <Button as={Link}>Start Processing</Button>{" "}
            <Button as={Link}>Finish</Button>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button as={Link}>Go to reported content</Button>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default Report;
