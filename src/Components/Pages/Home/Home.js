import "./Home.css";
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="mainPage">
      <div className="leftHalf">
        <Container>
          <Row>
            <Col>
              <h1 className="titleLeft">AffordAustin</h1>
              <p className="tagline">Build the life you deserve to live.</p>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="rightHalf">
        <h1>Explore</h1>
        <div className="cardBox">
          <Link to="/Housing">
            <Card className="housingCard">
              <Card.Body>
                <Card.Text>Housing</Card.Text>
              </Card.Body>
            </Card>
          </Link>
          <Link to="/Childcare">
            <Card className="childcareCard">
              <Card.Body>
                <Card.Text>Childcare</Card.Text>
              </Card.Body>
            </Card>
          </Link>
          <Link to="/Jobs">
            <Card className="jobsCard">
              <Card.Body>
                <Card.Text>Jobs</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
