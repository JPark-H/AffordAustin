import './Instance.css';
import { Image, Container, Row, Col, ListGroup, Nav, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState, useCallback } from "react";
import { Link,  useParams } from 'react-router-dom';
import axios from 'axios';
import Koala from './../About/MemberCards/imgs/Koallaaaaa.png'
import PageNotFound from './../../PageNotFound';


const Housing = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [instanceData, setInstanceData] = useState([]);
  const [isValidId, setIsValidId] = useState(true);

  const getInstanceData = useCallback (async () => {
    setLoading(true);
    axios.defaults.headers.common['Content-Type'] = 'application/vnd.api+json'
    axios.defaults.headers.common['Accept'] = 'application/vnd.api+json'
    let data;
    try {
      data = await axios.get(`http://localhost:5000/api/housing/${id}`);
      // data = await axios.get(`https://api.affordaustin.me/api/housing/${id}`);
      setInstanceData(data.data.data.attributes);
    } catch (error) {
      setIsValidId(false);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    getInstanceData();
  }, [id, getInstanceData])

  return (
    <div style={{ backgroundColor: "#f0f2f5" }}>
      {!isValidId ? <PageNotFound /> :
        (loading ? <div></div> :
          <HousingData housing={instanceData}/>)}
    </div>

  );
}

const HousingData = ({housing}) => {
  return (
    <div>
      <Container className="inst_page">
          <Row className="inst_header"><h1>{housing.project_name}</h1></Row>
          <Row style={{paddingLeft:"10px", paddingRight:"10px"}}>
              <Col className="inst_info" md={8}>
                  <Row><Image className="inst_img" src={Koala}></Image></Row>
                  <Row className="info_section">
                    <h4>Details</h4>
                    <p>Address: {housing.address}</p>
                    <p>ZIP Code: {housing.zip_code}</p>
                    <p>Status: {housing.status.split(".")[1]}</p>
                    <p>Developer: {housing.developer}</p>
                    <p>Unit Type: {housing.unit_type}</p>
                    <p>Ground Lease: {housing.ground_lease}</p>
                    <p>Tenure: {housing.tenure}</p>
                    <p>Affordability Guarantee: {housing.affordability_expiration_year}</p>
                  </Row>
                  <Row className="info_section" style={{paddingLeft:"15px", paddingRight:"15px"}}>
                    <h4>Price Points</h4>
                    <Table striped bordered style={{textAlign:"center"}}>
                      <thead>
                        <tr><th colSpan={7}>% Family Income</th></tr>
                      </thead>
                        <tbody>
                        <tr>
                          <td>30%</td>
                          <td>40%</td>
                          <td>50%</td>
                          <td>60%</td>
                          <td>65%</td>
                          <td>80%</td>
                          <td>100%</td>
                          </tr>
                        <tr>
                          <td>{housing.units_30_mfi}</td>
                          <td>{housing.units_40_mfi}</td>
                          <td>{housing.units_50_mfi}</td>
                          <td>{housing.units_60_mfi}</td>
                          <td>{housing.units_65_mfi}</td>
                          <td>{housing.units_80_mfi}</td>
                          <td>{housing.units_100_mfi}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Row>
              </Col>
              <Col className="inst_side_bar">
                  <Row className='side_bar_info'>
                      <h4>Location:</h4>
                      <Image className="inst_map" src={Koala}></Image>
                  </Row>
                  <Row className='side_bar_info'>
                    <h4>Contact Information</h4>
                    <ListGroup>
                      <ListGroup.Item>Management Company: {housing.units_30_mfi}</ListGroup.Item>
                      <ListGroup.Item>Phone Number: {housing.property_manager_phone_number}</ListGroup.Item>
                    </ListGroup>
                  </Row>
                  <Row className="side_bar_info">
                    <h4>Nearby Jobs</h4>
                      <Nav>
                        <Nav.Link as={ Link } to='/Jobs/1'>Flood Reporting Coordinator</Nav.Link>
                        <Nav.Link as={ Link } to='/Jobs/42'>Front Office Medical Receptionist</Nav.Link>
                        <Nav.Link as={ Link } to='/Jobs/181'>Human Resources (HR) Assistant</Nav.Link>
                      </Nav>
                  </Row>
                  <Row className="side_bar_info">
                      <h4>Nearby Childcare Services</h4>
                      <Nav>
                        <Nav.Link as={ Link } to='/Childcare/1'>Laura Bush YMCA</Nav.Link>
                        <Nav.Link as={ Link } to='/Childcare/2'>Escuelita Art-es-Inc</Nav.Link>
                        <Nav.Link as={ Link } to='/Childcare/4'>Stepping Stone School VIII</Nav.Link>
                      </Nav>
                  </Row>
              </Col>
          </Row>
      </Container>
    </div>
  );
}

export default Housing;
