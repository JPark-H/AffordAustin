import './Grid.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect, useCallback } from 'react';
import Paginate from '../../Pagination/Pagination';
import axios from 'axios';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Koala from './../About/MemberCards/imgs/Koallaaaaa.png'

const HousingGrid = () => {
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalNumHouses, setTotalNumHouses] = useState(1);
    const [housesPerPage, setHousesPerPage] = useState(21);

    const getHousingData = useCallback (async (query) => {
        setLoading(true);
        axios.defaults.headers.common['Content-Type'] = 'application/vnd.api+json'
        axios.defaults.headers.common['Accept'] = 'application/vnd.api+json'
        const endpoint = `http://localhost:5000/api/housing?page[size]=${housesPerPage}&page[number]=${currentPage}`;
        // const endpoint = `https://api.affordaustin.me/api/housing?page[size]=${housesPerPage}&page[number]=${currentPage}`;
        const data = await axios.get(endpoint);
        setTotalNumHouses(data.data.meta.total);
        setHouses(data.data.data);
        setLoading(false);
    }, [currentPage, housesPerPage]);

    useEffect(() => {
        getHousingData('');
    }, [currentPage, getHousingData]);

    const paginate = (pageNum) => {
        setCurrentPage(pageNum);
    };

    return (
        <div style={{ backgroundColor: "#f0f2f5" }}>
            <div className='grid mx-auto'>
                <Container fluid>
                    <Row>
                        <h1 className="grid_header">Housing</h1>
                    </Row>
                    <Row>
                        <Paginate totalInstances={totalNumHouses} pageLimit={housesPerPage} paginate={paginate} />
                    </Row>
                        <h1 className="results">Showing {houses.length} Results</h1>
                    <Row className="g-3 justify-content-center" xs='auto'>
                        {loading ? <h3 className="results">Loading</h3> : houses.map(house => {
                            return (
                            <Col key={house.id}>
                                <InstanceCard housing={house.attributes} housing_id={house.id}/>
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
                <Card.Img variant='top' src={Koala} />
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