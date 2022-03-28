import './Instance.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Image, ListGroup, Nav } from 'react-bootstrap';
import React, { useEffect, useState, useCallback } from "react";
import { Link,  useParams } from 'react-router-dom';
import axios from 'axios';
import Koala from './../About/MemberCards/imgs/Koallaaaaa.png';
import PageNotFound from './../../PageNotFound';

const ChildCare = () => {
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
            // data = await axios.get(`http://localhost:5000/api/childcare/${id}`);
            data = await axios.get(`https://api.affordaustin.me/api/childcare/${id}`); 
            setInstanceData(data.data.data.attributes);
        } catch (error) {
            setIsValidId(false);
        }
        setLoading(false);
    }, [id]);

    useEffect(() => {
        getInstanceData();
    }, [id, getInstanceData]);

    return (
        <div style={{ backgroundColor: "#f0f2f5" }}>
            {!isValidId ? <PageNotFound /> : 
                (loading ? <div></div> : 
                    <ChildCareData child_care={instanceData}/>)}
            
        </div>
    );
};

const ChildCareData = ({child_care}) => {
    return (
        <div>
      <Container className="inst_page">
          <Row className="inst_header"><h1>{child_care.operation_name}</h1></Row>
          <Row style={{paddingLeft:"10px", paddingRight:"10px"}}>
              <Col className="inst_info" md={8}>
                  <Row><Image className="inst_img" src={Koala}></Image></Row>
                  <Row className="info_section">
                    <h4>Data</h4>
                    <p><b>Operation Type:</b> {child_care.operation_type}</p>
                    <p><b>Programs Provided:</b> {child_care.programs_provided}</p>
                    <p><b>Administrator's Name:</b> {child_care.administrator_director_name}</p>
                    <p><b>Accepts Child Care Subsidies:</b> {child_care.accepts_child_care_subsidies}</p>
                    <p><b>Days of Operation:</b> {child_care.days_of_operation}</p>
                    <p><b>Hours of Operations:</b> {child_care.hours_of_operation}</p>
                    <p><b>Licensed to Serve Ages:</b> {child_care.licensed_to_serve_ages}</p>
                  </Row>
                  {/* Use inspections/reports to fill table */}
                  {/* <Row className="info_section" style={{paddingLeft:"15px", paddingRight:"15px"}}>
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
                  </Row> */}
              </Col>
              <Col className="inst_side_bar">
                  <Row className='side_bar_info'>
                      <h4>Location:</h4>
                      <Image className="inst_map" src={Koala}></Image>
                  </Row>
                  <Row className='side_bar_info'>
                    <h4>Contact Information</h4>
                    <ListGroup>
                        <ListGroup.Item><b>Phone Number:</b> {child_care.phone_number}</ListGroup.Item>
                        <ListGroup.Item><b>Website:</b> <a href={"https://" + child_care.website_address}>{child_care.website_address}</a></ListGroup.Item>
                        <ListGroup.Item><b>Address:</b> {child_care.location_address}</ListGroup.Item>
                        <ListGroup.Item><b>Mailing Address:</b> {child_care.mailing_address}</ListGroup.Item>
                        <ListGroup.Item><b>County:</b> {child_care.county}</ListGroup.Item>
                        <ListGroup.Item><b>Email Address:</b> {child_care.email_address}</ListGroup.Item>
                    </ListGroup>
                  </Row>
                  <Row className="side_bar_info">
                    <h4>Nearby Housing</h4>
                        <Nav>
                            <Nav.Link as={ Link } to='/Housing/1'>Legacy Apartments</Nav.Link>
                            <Nav.Link as={ Link } to='/Housing/2'>Sol</Nav.Link>
                            <Nav.Link as={ Link } to='/Housing/3'>1905 E 9th Street</Nav.Link>
                        </Nav>
                  </Row>
                  <Row className="side_bar_info">
                      <h4>Nearby Jobs</h4>
                      <Nav>
                          <Nav.Link as={ Link } to='/Jobs/1'>Flood Reporting Coordinator (Data Analyst I-III)</Nav.Link>
                          <Nav.Link as={ Link } to='/Jobs/42'>Front Office Medical Receptionist</Nav.Link>
                          <Nav.Link as={ Link } to='/Jobs/181'>Human Resources (HR) Assistant</Nav.Link>
                      </Nav>
                  </Row>
              </Col>
          </Row>
      </Container>
    </div>
    )

}

export default ChildCare;