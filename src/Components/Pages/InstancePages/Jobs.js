import './Instance.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Image, ListGroup, Button, Nav } from 'react-bootstrap';
import React, { useEffect, useState, useCallback } from "react";
import { Link,  useParams } from 'react-router-dom';
import axios from 'axios';
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
            // data = await axios.get(`https://api.affordaustin.me/api/jobs/${id}`);
            console.log(data.data)
            setInstanceData(data.data);  
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
                    <JobData job={instanceData}/>)}
        </div>
    );
};

const JobData = ({job}) => {
    let features = job.extensions.slice(1, (job.extensions.length - 1)).split(", ").slice(1);
    features = features.map(x => x.slice(1, (x.length - 1)));
    let map1 = job._map.split("\n")[1].trim();
    map1 = map1.slice(5, map1.length -1);
    return (
        <div>
            <Container className="inst_page">
                <Row className="inst_header"><h1>{job.title}</h1></Row>
                <Row style={{paddingLeft:"10px", paddingRight:"10px"}}>
                    <Col className="inst_info" md={8}>
                        <Row><Image className="inst_img" src={job._image}></Image></Row>
                        <Row className="info_section">
                            <h3>Description</h3>
                            <p>{ job.description }</p>
                        </Row>
                    </Col>
                    <Col className="inst_side_bar">
                        <Row className='side_bar_info'>
                            <h4>Location:</h4>
                            <iframe src={map1}></iframe>
                        </Row>
                        <Row className='side_bar_info'>
                            <h4>Company</h4>
                            <p>{ job.company_name }</p>
                        </Row>
                        <Row className="side_bar_info">
                            <h4>Via</h4>
                            <Button variant='primary' href={ job.apply_link }>{ job.via }</Button>
                        </Row>
                        <Row className="side_bar_info">
                            <h4>Features</h4>
                            <ListGroup>
                                {features.map(feature => (
                                    <ListGroup.Item key={feature}>{feature}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Row>
                        <Row className="side_bar_info">
                            <h4>Rating</h4>
                            {job.reviews === "-1" ? <div><p>No Reviews</p></div> : 
                            <p><b>{ job.rating }</b> / 5 | <a href={job.rating_link} style={{color:"blue"}}>{ job.reviews } Reviews</a></p>}
                        </Row>
                        <Row className="side_bar_info">
                            <h4>Nearby Housing</h4>
                            <Nav>
                                <Nav.Link as={ Link } to='/Housing/1'>110 Chicon Street</Nav.Link>
                                <Nav.Link as={ Link } to='/Housing/2'>1905 E Street</Nav.Link>
                                <Nav.Link as={ Link } to='/Housing/3'>2009 Salina Street</Nav.Link>
                            </Nav>
                        </Row>
                        <Row className="side_bar_info">
                            <h4>Nearby Childcare Services</h4>
                            <Nav>
                                <Nav.Link as={ Link } to='/Childcare/1'>Lil Lions Learning Center</Nav.Link>
                                <Nav.Link as={ Link } to='/Childcare/2'>Escuelita Del Alma</Nav.Link>
                                <Nav.Link as={ Link } to='/Childcare/4'>Perez EAC YMCA</Nav.Link>
                            </Nav>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );

}

export default Jobs;