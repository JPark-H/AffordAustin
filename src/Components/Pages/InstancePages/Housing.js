import './Housing.css';
import { Image, Container, Button, Card, Row, Col, ListGroup } from 'react-bootstrap';
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
      // data = await axios.get(`http://localhost:5000/api/housing/${id}`);
      data = await axios.get(`https://api.affordaustin.me/api/housing/${id}`);
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
        (loading ? <h3 style={{color: "black"}}>Loading</h3> :
          <HousingData housing={instanceData} id={id}/>)}
    </div>

  );
}

const HousingData = ({housing, id}) => {
  const link_j = `/Jobs/${ id }`
  const link_c = `/Childcare/${ id }`
  return (
    <div className="info_page mx-auto justify-content-center">
      <p className="instance_header">
        {housing.project_name}
      </p>
      <Container className="instance_info">
        <p className="attribute_head">Location Image</p>
        {/* Replace */}
        <Image className="hous_image" rounded src={Koala}></Image>
        <p className="attribute_head">Map</p>
        {/* Replace */}
        {/* <div className='hous_map' dangerouslySetInnerHTML={{ __html: housing.map }}></div> */}
        <div className='hous_map'><Image src={Koala}></Image></div>
        <Card className="instance_data mx-auto" style={{
          borderTopRightRadius: "2rem",
          borderTopLeftRadius: "2rem"
        }}>
          <Card.Header style={{
            borderTopRightRadius: "2rem",
            borderTopLeftRadius: "2rem"
          }}>Details</Card.Header>
          <ListGroup className="attribute_list" style={{ textAlign: "left" }} variant="flush">
            <ListGroup.Item>Address: {housing.address}</ListGroup.Item>
            <ListGroup.Item>ZIP Code: {housing.zip_code}</ListGroup.Item>
            <ListGroup.Item>Status: {housing.status.split(".")[1]}</ListGroup.Item>
            <ListGroup.Item>Developer: {housing.developer}</ListGroup.Item>
            <ListGroup.Item>Unit Type: {housing.unit_type}</ListGroup.Item>
            <ListGroup.Item>Ground Lease: {housing.ground_lease}</ListGroup.Item>
            <ListGroup.Item>Tenure: {housing.tenure}</ListGroup.Item>
            <ListGroup.Item>Affordability Guarantee: {housing.affordability_expiration_year}</ListGroup.Item>
          </ListGroup>
        </Card>

        <Card className="instance_data mx-auto mt-4" style={{
          borderTopRightRadius: "2rem",
          borderTopLeftRadius: "2rem"
        }}>
          <Card.Header style={{
            borderTopRightRadius: "2rem",
            borderTopLeftRadius: "2rem"
          }}>Price Points</Card.Header>
          <ListGroup className="attribute_list" style={{ textAlign: "left" }} variant="flush">
            <ListGroup.Item>30% Median Family Income: {housing.units_30_mfi}</ListGroup.Item>
            <ListGroup.Item>40% Median Family Income: {housing.units_40_mfi}</ListGroup.Item>
            <ListGroup.Item>50% Median Family Income: {housing.units_50_mfi}</ListGroup.Item>
            <ListGroup.Item>60% Median Family Income: {housing.units_60_mfi}</ListGroup.Item>
            <ListGroup.Item>65% Median Family Income: {housing.units_65_mfi}</ListGroup.Item>
            <ListGroup.Item>80% Median Family Income: {housing.units_80_mfi}</ListGroup.Item>
            <ListGroup.Item>100% Median Family Income: {housing.units_100_mfi}</ListGroup.Item>
          </ListGroup>
        </Card>

        <Card className="instance_data mx-auto mt-4" style={{
          borderTopRightRadius: "2rem",
          borderTopLeftRadius: "2rem"
        }}>
          <Card.Header style={{
            borderTopRightRadius: "2rem",
            borderTopLeftRadius: "2rem"
          }}>Contact Info</Card.Header>
          <ListGroup className="attribute_list" style={{ textAlign: "left" }} variant="flush">
            <ListGroup.Item>Management Company: {housing.units_30_mfi}</ListGroup.Item>
            <ListGroup.Item>Phone Number: {housing.property_manager_phone_number}</ListGroup.Item>
          </ListGroup>
        </Card>

        <Row className="mt-3 justify-content-between mx-auto" >
          <Link to={ link_j }>
            <Col className="mx-auto"><Button id="btn-back-to-top" variant="secondary">Nearby Job</Button>{' '}</Col>
          </Link>
          <Link to={ link_c }>
            <Col className="mx-auto"><Button variant="secondary">Child Care</Button>{' '}</Col>
          </Link>
        </Row>
      </Container>
    </div>
  );
}

export default Housing;
