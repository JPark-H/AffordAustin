import './Jobs.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Container, Row, Col, Stack, Image, ListGroup, Button, Nav } from 'react-bootstrap';
import React, { useEffect, useState, useCallback } from "react";
import { Link,  useParams } from 'react-router-dom';
import axios from 'axios';
import Koala from './../About/MemberCards/imgs/Koallaaaaa.png'
import PageNotFound from './../../PageNotFound';

const Jobs = () => {
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
            data = await axios.get(`http://localhost:5000/api/jobs/${id}`);
            // const data = await axios.get(`http://api.affordaustin.me/api/jobs/${id}`);
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
                    <JobData job={instanceData} id={id}/>)}
        </div>
    );
};

const JobData = ({job, id}) => {
    let features = job.extensions.slice(1, (job.extensions.length - 1)).split(", ").slice(1);
    features = features.map(x => x.slice(1, (x.length - 1)));
    return (
        <div className='jobs'>
            <Container className='instance'>
                <Row>
                    <Col className='header'>{ job.title }</Col>
                </Row>

                <Row className='align-items-center'>
                    {/* Replace */}
                    <Col><Image className='image' src={ Koala }></Image></Col>
                    {/* <Col><div className='map' dangerouslySetInnerHTML={{ __html: job.map_H }}></div></Col> */}
                    <Col><div className='map'><Image className='image' src={Koala}></Image></div></Col>
                </Row>

                <Row className='info'>
                    <Col xs={8}>
                        <Stack>
                            <h3>Description</h3>
                            <p>{ job.description }</p>
                        </Stack>
                    </Col>
                    <Col xs={3}>
                        <Stack gap={3}>
                        <div className='company'>
                            <h4>Company</h4>
                            <p>{ job.company_name }</p>
                        </div>

                        <div className='via'>
                            <h4>Via</h4>
                            <Button variant='primary' href={ job.apply_link }>{ job.via }</Button>
                        </div>

                        <div className='features'>
                            <h4>Features</h4>
                            <ListGroup>
                                {features.map(feature => (
                                    <ListGroup.Item key={feature}>{feature}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>

                        <div className='rating'>
                            <h4>Rating</h4>
                            <p><b>{ job.rating }</b> / 5 | { job.reviews } Reviews</p>
                        </div>

                        <div className='housing'>
                            <h4>Nearby Housing</h4>
                            <Nav>
                                <Nav.Link as={ Link } to='/Housing/1'>Legacy Apartments</Nav.Link>
                                <Nav.Link as={ Link } to='/Housing/2'>1905 E 9th Street</Nav.Link>
                                <Nav.Link as={ Link } to='/Housing/3'>2009 Salina Street</Nav.Link>
                            </Nav>
                        </div>

                        <div className='childcare'>
                            <h4>Nearby Childcare Services</h4>
                            <Nav>
                                <Nav.Link as={ Link } to='/Childcare/1'>Zilker EAC YMCA</Nav.Link>
                                <Nav.Link as={ Link } to='/Childcare/2'>Children's Center of Austin</Nav.Link>
                                <Nav.Link as={ Link } to='/Childcare/3'>A+ Kids Playschool</Nav.Link>
                            </Nav>
                        </div>
                        </Stack>
                    </Col>
                </Row>
            </Container>
        </div>
    );

}

export default Jobs;