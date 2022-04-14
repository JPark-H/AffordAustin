import './Grid.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Card, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';
import FSBar from './FSBar/FSBar';
import axios from 'axios';

const ChildCareGrid = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalNumPrograms, setTotalNumPrograms] = useState(1);
    const [programsPerPage, setProgramsPerPage] = useState(21);
    const [query, setQuery] = useState('');

    const getChildCareData = useCallback (async () => {
        setLoading(true);
        let endpoint = `https://api.affordaustin.me/api/childcare?page[size]=${programsPerPage}&page[number]=${currentPage}`;
        endpoint += (query === "") ? "" : "&" + query;
        console.log(endpoint);
        const data = await axios.get(endpoint);
        setTotalNumPrograms(data.data.metadata.total_count);
        setPrograms(data.data.attributes);
        setLoading(false);
    }, [currentPage, programsPerPage, query]);

    useEffect(() => {
        getChildCareData('');
    }, [currentPage, query, getChildCareData]);

    const paginate = (pageNum) => {
        setCurrentPage(pageNum);
    };

    const getQuery = (new_query) => {
        setQuery(new_query);
    };

    return (
        <div style={{ backgroundColor: "#f0f2f5" }}>
            <div className='grid mx-auto'>
                <Container fluid>
                    <Row>
                        <h1 className='grid_header'>Child Care</h1>
                    </Row>
                    <Row>
                    <FSBar totalInstances={totalNumPrograms} pageLimit={programsPerPage} paginate={paginate} currentPage={currentPage} sendQuery={getQuery} model="Childcare"/>
                    </Row>
                    <Row className="justify-content-center">
                        {loading ? <Spinner animation='border' role="status"/> : <></>}
                    </Row>
                    <Row className="g-3 justify-content-center" xs='auto'>
                        {loading ? <></> : programs.map(program => {
                            return (
                            <Col key={program.id}>
                                <InstanceCard child_care={program} id={program.id}/>
                            </Col>);
                        })}
                    </Row>
                </Container>
            </div>
        </div>
    );
}

const InstanceCard = ({ child_care, id }) => {
    const link = `/ChildCare/${ id }`;
    let ages = child_care.licensed_to_serve_ages.toString();
    ages = ages.replaceAll(',', ", ");
    let days = child_care.days_of_operation.toString();
    days = (days === "Mon,Tue,Wed,Thu,Fri") ? "Monday-Friday" : days.replaceAll(",", ", ");
    return (
        <Link to={ link }>
            <Card className='c_inst_card'>
                <Card.Img variant='top' src={child_care._image} />
                <Card.Body>
                    <Card.Title className="text-truncate">{ child_care.operation_name }</Card.Title>
                    <Card.Text><b>Address:</b> { child_care.location_address }</Card.Text>
                    <Card.Text><b>County:</b> { child_care.county }</Card.Text>
                    <Card.Text><b>Days of Operation:</b> { days }</Card.Text>
                    <Card.Text><b>Hours of Operation:</b> { child_care.hours_of_operation }</Card.Text>
                    <Card.Text><b>Ages Served:</b> { ages }</Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
};

export default ChildCareGrid;