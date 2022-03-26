import './ChildCare.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Container, Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import { Link,  useParams } from 'react-router-dom';
import axios from 'axios';
import Koala from './../About/MemberCards/imgs/Koallaaaaa.png'

const ChildCare = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [instanceData, setInstanceData] = useState([]);

    const getInstanceData = async () => {
        setLoading(true);
        axios.defaults.headers.common['Content-Type'] = 'application/vnd.api+json'
        axios.defaults.headers.common['Accept'] = 'application/vnd.api+json'
        const data = await axios.get(`http://localhost:5000/api/childcare/${id}`);
        // const data = await axios.get(`http://api.affordaustin.me/api/childcare/${id}`);
        setInstanceData(data.data.data.attributes);
        setLoading(false);
    };

    useEffect(() => {
        getInstanceData();
    }, [id])
    
    return (
        <div style={{ backgroundColor: "#f0f2f5" }}>
            {loading ? <h3 style={{color: "black"}}>Loading</h3> : <ChildCareData child_care={instanceData} id={id}/>}
        </div>
    );
};

const ChildCareData = ({child_care, id}) => {
    const link_j = `/Jobs/${ id }`
    const link_h = `/Housing/${ id }`
    return (
        <div className="info_page mx-auto justify-content-center">
            <p className="instance_header">{child_care.operation_name}</p>
            <Container className="instance_info">
                <p className="attribute_head">Location Image</p>
                {/* Replace */}
                <Image className="c_image" rounded src={Koala}></Image>
                <Row>
                    <Col>
                        <Card className="instance_data mx-auto" style={{
                            borderTopRightRadius: "2rem",
                            borderTopLeftRadius: "2rem"
                        }}>
                            <Card.Header style={{
                                borderTopRightRadius: "2rem",
                                borderTopLeftRadius: "2rem"
                            }}>Data</Card.Header>
                            <ListGroup className="attribute_list" style={{ textAlign: "left" }} variant="flush">
                                <ListGroup.Item><b>Operation Type:</b> {child_care.operation_type}</ListGroup.Item>
                                <ListGroup.Item><b>Programs Provided:</b> {child_care.programs_provided}</ListGroup.Item>
                                <ListGroup.Item><b>Administrator's Name:</b> {child_care.administrator_director_name}</ListGroup.Item>
                                <ListGroup.Item><b>Accepts Child Care Subsidies:</b> {child_care.accepts_child_care_subsidies}</ListGroup.Item>
                                <ListGroup.Item><b>Days of Operation:</b> {child_care.days_of_operation}</ListGroup.Item>
                                <ListGroup.Item><b>Hours of Operations:</b> {child_care.hours_of_operation}</ListGroup.Item>
                                <ListGroup.Item><b>Licensed to Serve Ages:</b> {child_care.licensed_to_serve_ages}</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="instance_data mx-auto" style={{
                            borderTopRightRadius: "2rem",
                            borderTopLeftRadius: "2rem"
                        }}>
                            <Card.Header style={{
                                borderTopRightRadius: "2rem",
                                borderTopLeftRadius: "2rem"
                            }}>Contact Information</Card.Header>
                            <ListGroup className="attribute_list" style={{ textAlign: "left" }} variant="flush">
                                <ListGroup.Item><b>Phone Number:</b> {child_care.phone_number}</ListGroup.Item>
                                <ListGroup.Item><b>Website:</b> <a href={"https://" + child_care.website_address}>{child_care.website_address}</a></ListGroup.Item>
                                <ListGroup.Item><b>Address:</b> {child_care.location_address}</ListGroup.Item>
                                <ListGroup.Item><b>Mailing Address:</b> {child_care.mailing_address}</ListGroup.Item>
                                <ListGroup.Item><b>County:</b> {child_care.county}</ListGroup.Item>
                                <ListGroup.Item><b>Email Address:</b> {child_care.email_address}</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
                <p className="attribute_head">Map</p>
                {/* Replace */}
                {/* <div className='c_map' dangerouslySetInnerHTML={{ __html: child_care.map }}></div> */}
                <div className='c_map'><Image src={Koala}></Image></div>
                <Row className="mt-3 justify-content-between mx-auto" >
                    <Link to={link_j}>
                        <Col className="mx-auto"><Button variant="secondary">Find Nearby Jobs</Button>{' '}</Col>
                    </Link>
                    <Link to={link_h}>
                        <Col className="mx-auto"><Button variant="secondary">Find Nearby Housing</Button>{' '}</Col>
                    </Link>
                </Row>
            </Container>
        </div>
    )

}

export default ChildCare;