import './Grid.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Card, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';
import Paginate from '../../Pagination/Pagination';
import axios from 'axios';

const ChildCareGrid = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalNumPrograms, setTotalNumPrograms] = useState(1);
    const [programsPerPage, setProgramsPerPage] = useState(21);

    const getChildCareData = useCallback (async (query) => {
        setLoading(true);
        axios.defaults.headers.common['Content-Type'] = 'application/vnd.api+json';
        axios.defaults.headers.common['Accept'] = 'application/vnd.api+json';
        const endpoint = `https://api.affordaustin.me/api/childcare?page[size]=${programsPerPage}&page[number]=${currentPage}`;
        const data = await axios.get(endpoint);
        setTotalNumPrograms(data.data.meta.total);
        setPrograms(data.data.data);
        setLoading(false);
    }, [currentPage, programsPerPage]);

    useEffect(() => {
        getChildCareData('');
    }, [currentPage, getChildCareData]);

    const paginate = (pageNum) => {
        setCurrentPage(pageNum);
    };

    return (
        <div style={{ backgroundColor: "#f0f2f5" }}>
            <div className='grid mx-auto'>
                <Container fluid>
                    <Row>
                        <h1 className='grid_header'>Child Care</h1>
                    </Row>
                    <Row>
                        <Paginate totalInstances={totalNumPrograms} pageLimit={programsPerPage} paginate={paginate} />
                    </Row>
                    <Row className="justify-content-center">
                        {loading ? <Spinner animation='border' role="status"/> : 
                            <h1 className="results">Showing {programs.length} Results Out Of {totalNumPrograms}</h1>}
                    </Row>
                    <Row className="g-3 justify-content-center" xs='auto'>
                        {loading ? <></> : programs.map(program => {
                            return (
                            <Col key={program.id}>
                                <InstanceCard child_care={program.attributes} id={program.id}/>
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
    let ages = child_care.licensed_to_serve_ages.replaceAll(",", ", ");
    return (
        <Link to={ link }>
            <Card className='c_inst_card'>
                <Card.Img variant='top' src={child_care._image} />
                <Card.Body>
                    <Card.Title className="text-truncate">{ child_care.operation_name }</Card.Title>
                    <Card.Text><b>Address:</b> { child_care.location_address }</Card.Text>
                    <Card.Text><b>County:</b> { child_care.county }</Card.Text>
                    <Card.Text><b>Days of Operation:</b> { child_care.days_of_operation }</Card.Text>
                    <Card.Text><b>Hours of Operation:</b> { child_care.hours_of_operation }</Card.Text>
                    <Card.Text><b>Ages Served:</b> { ages }</Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
};

export default ChildCareGrid;
