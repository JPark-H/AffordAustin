import './Grid.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Container, Card, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FSBar from './FSBar/FSBar';

const HousingGrid = () => {
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalNumHouses, setTotalNumHouses] = useState(1);
    const [housesPerPage, setHousesPerPage] = useState(21);
    const [query, setQuery] = useState('');

    const getHousingData = useCallback (async () => {
        setLoading(true);
        console.log(query);
        axios.defaults.headers.common['Content-Type'] = 'application/vnd.api+json';
        axios.defaults.headers.common['Accept'] = 'application/vnd.api+json';
        const endpoint = `https://api.affordaustin.me/api/housing?page[size]=${housesPerPage}&page[number]=${currentPage}`;
        const data = await axios.get(endpoint);
        setTotalNumHouses(data.data.metadata.total_count);
        setHouses(data.data.attributes);
        setLoading(false);
    }, [currentPage, housesPerPage, query]);

    useEffect(() => {
        getHousingData();
    }, [currentPage, query, getHousingData]);

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
                        <h1 className="grid_header">Housing</h1>
                    </Row>
                    <Row>
                        <FSBar totalInstances={totalNumHouses} pageLimit={housesPerPage} paginate={paginate} currentPage={currentPage} sendQuery={getQuery} model="Housing"/>
                    </Row>
                    <Row className="justify-content-center">
                        {loading ? <Spinner animation='border' role="status"/> : <></>}
                    </Row>
                    <Row className="g-3 justify-content-center" xs='auto'>
                        {loading ? <></> : houses.map(house => {
                            return (
                            <Col key={house.id}>
                                <InstanceCard housing={house} housing_id={house.id}/>
                            </Col>);
                        })}
                    </Row>
                </Container>
            </div>
        </div>
        
    )
};

const InstanceCard = ({ housing, housing_id}) => {
    const link = `/Housing/${ housing_id }`;

    return (
        <Link to={ link }>
            <Card className='inst_card'>
                <Card.Img variant='top' src={housing._image} />
                <Card.Body>
                    <Card.Title className="text-truncate">{ housing.project_name }</Card.Title>
                    <Card.Text><b>Tenure :</b> { housing.tenure }</Card.Text>
                    <Card.Text><b>Unit-Type:</b> { housing.unit_type }</Card.Text>
                    <Card.Text><b>Num of Units:</b> { housing.total_units }</Card.Text>
                    <Card.Text><b>Ground Lease:</b> { housing.ground_lease }</Card.Text>
                    <Card.Text><b>Zip-Code:</b> { housing.zip_code }</Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
};

export default HousingGrid;