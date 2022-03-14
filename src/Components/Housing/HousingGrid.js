import './HousingGrid.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react';
import Paginate from './../Pagination/Pagination';
import axios from 'axios';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Koala from './../About/MemberCards/imgs/Koallaaaaa.png'

const HousingGrid = () => {
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    //Replace when we have working database
    const numHouses = 2191;
    const housesPerPage = 20;

    const getHousingData = async (query) => {
        setLoading(true);
        const endpoint = 'https://data.austintexas.gov/resource/x5p7-qyuv.json';
        const data = await axios.get(endpoint + query);
        setHouses(data.data);
        setLoading(false);
    }

    useEffect(() => {
        //Stand in query
        getHousingData('?$where=project_id<3235');
    }, []);

    const paginate = (pageNum) => {
        setCurrentPage(pageNum);
        //Stand in query
        const minID = 3225;
        const begin = minID + ((pageNum - 1) * housesPerPage);
        console.log("First index" + begin);
        getHousingData('?$where=project_id between ' + begin + ' and ' + (begin + housesPerPage - 1));
    }

    return (
        <div style={{ backgroundColor: "#f0f2f5" }}>
            <div className='housingGrid mx-auto'>
                <Container>
                    <Row>
                        <Col className='header'>Housing</Col>
                    </Row>
                    <Row>
                        <Paginate totalInstances={numHouses} pageLimit={housesPerPage} paginate={paginate} />
                    </Row>
                        <h1 style = {{fontSize:"40px", textAlign:"center"}}>{houses.length} Results</h1>
                    <Row className="g-3 justify-content-center" xs="auto">
                        {loading ? <h3>Loading</h3> : houses.map(house => {
                            return (
                            <Col key={house.project_id}>
                                <InstanceCard housing={house} />
                            </Col>);
                        })}
                    </Row>
                </Container>
            </div>
        </div>
        
    )
};

const InstanceCard = ({ housing }) => {
    const link = `/Housing/${ housing.id }`;

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