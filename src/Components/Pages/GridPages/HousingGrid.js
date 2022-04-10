import './Grid.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect, useCallback } from 'react';
import Paginate from '../../Pagination/Pagination';
import axios from 'axios';
import { Container, Card, Row, Col, Spinner, Form, FormControl, Button, FormGroup, FormLabel, ButtonToolbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IconSearch } from '@aws-amplify/ui-react';

const HousingGrid = () => {
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalNumHouses, setTotalNumHouses] = useState(1);
    const [housesPerPage, setHousesPerPage] = useState(21);

    const getHousingData = useCallback (async (query) => {
        setLoading(true);
        axios.defaults.headers.common['Content-Type'] = 'application/vnd.api+json';
        axios.defaults.headers.common['Accept'] = 'application/vnd.api+json';
        const endpoint = `https://api.affordaustin.me/api/housing?page[size]=${housesPerPage}&page[number]=${currentPage}`;
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
                        <FSBar totalInstances={totalNumHouses} pageLimit={housesPerPage} paginate={paginate} currentPage={currentPage}/>
                    </Row>
                    <Row className="justify-content-center">
                        {loading ? <Spinner animation='border' role="status"/> : <></>}
                    </Row>
                    <Row className="g-3 justify-content-center" xs='auto'>
                        {loading ? <></> : houses.map(house => {
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

const FSBar = ({totalInstances, pageLimit, paginate, currentPage}) => {
    const first_result = ((currentPage - 1) * pageLimit) + 1;
    const last_result = (totalInstances / pageLimit > currentPage) ? (first_result + pageLimit) : (first_result + totalInstances % pageLimit);
    return (
        <Container className='grid_fs_bar' style={{backgroundColor:'white', width:'90%', marginBottom:'15px', outlineStyle:'solid', outlineColor:'lightgray', outlineWidth:'thin', paddingTop:'10px'}}>
            <Row className='grid_filters' style={{paddingBottom:"20px", marginLeft:'15px', marginRight:'15px'}}><FilterBar /></Row>
            <Row className='grid_sorters' style={{paddingBottom:'20px', marginLeft:'15px', marginRight:'15px'}}><SortBar /></Row>
            <Row className='grid_ps_bar' xs='auto' style={{marginLeft:'15px', marginRight:'15px'}}>
                <Col style={{marginRight:'auto'}}><Paginate totalInstances={totalInstances} pageLimit={pageLimit} paginate={paginate} /></Col>
                <Col><h3 className="result">Showing Results {first_result}-{last_result} of {totalInstances}</h3></Col>
                <Col style={{marginLeft:'auto'}}><SearchBar /></Col>
            </Row>
        </Container>
    );
}

const FilterBar = () => {
    const handleChange = (e) => {
        console.log("Submit");
    };

    const handleZipSubmit = (e) => {
        console.log("Zip!");
    };

    return (
        <div style={{ textAlign:'center' }}>
            <h3>Filters:</h3>
            <Form>
                <Row className="g-3 justify-content-center" xs='auto'>
                    <Form.Group controlId='NumUnitsFilter' as={Col}>
                        <Form.Label>Number of Units</Form.Label>
                        <Form.Select
                            className='filter_select'
                            onChange={e => {handleChange(e)}}
                        >
                            <option>Select #Units</option>
                            <option>&lt;5</option>
                            <option>5-10</option>
                            <option>10-50</option>
                            <option>50-100</option>
                            <option>100+</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId='TenureFilter' as={Col}>
                        <Form.Label>Tenure</Form.Label>
                        <Form.Select
                            className='filter_select'
                            onChange={e => {handleChange(e)}}
                        >
                            <option>Select Tenure</option>
                            <option>Rental</option>
                            <option>Ownership</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId='UnitTypeFilter' as={Col}>
                        <Form.Label>Unit Type</Form.Label>
                        <Form.Select
                            className='filter_select'
                            onChange={e => {handleChange(e)}}
                        >
                            <option>Select Type</option>
                            <option>Single Family</option>
                            <option>Multifamily</option>
                            <option>Duplex</option>
                            <option>Fourplex</option>
                            <option>ADU</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId='ZipcodeFilter' as={Col}>
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control 
                            type='text'
                            placeholder='Zip Code'
                            className='filter_text'
                            // From https://stackoverflow.com/questions/34223558/enter-key-event-handler-on-react-bootstrap-input-component
                            onKeyPress={e => {
                                if (e.key === "Enter") {
                                handleZipSubmit(e);
                                }
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId='GroundLeaseFilter' as={Col}>
                        <Form.Label>Ground Lease</Form.Label>
                        <Form.Check onChange={e => {handleChange(e)}} type='checkbox' className='filter_check' />
                    </Form.Group>
                </Row>
            </Form>
        </div>
    );
}

const SortBar = () => {
    const [isNumUnits, setIsNumUnits] = useState(false);
    const [isUnitType, setIsUnitType] = useState(false);
    const [isZip, setIsZip] = useState(false);
    const [isAscending, setIsAscending] = useState(false);
    const [numUnitsName, setNumUnitsName] = useState("# Units");
    const [unitTypeName, setUnitTypeName] = useState("Unit Type");
    const [zipName, setZipName] = useState("Zip Code");

    const handleClick = (e) => {
        const button = e.target.value;
        setFilter(button);
    }

    const setFilter = useCallback((button) => {
        if (button === 'num_units') {
            if (!isNumUnits) {
                setIsNumUnits(true);
                setIsUnitType(false);
                setIsZip(false);
                setIsAscending(true);
            } else if (isAscending){
                setIsAscending(false);
            } else {
                setIsNumUnits(false);
            }
        } else if (button === 'unit_type') {
            if (!isUnitType) {
                setIsNumUnits(false);
                setIsUnitType(true);
                setIsZip(false);
                setIsAscending(true);
            } else if (isAscending){
                setIsAscending(false);
            } else {
                setIsUnitType(false);
            }
        } else if (button === 'zip') {
            if (!isZip) {
                setIsNumUnits(false);
                setIsUnitType(false);
                setIsZip(true);
                setIsAscending(true);
            } else if (isAscending){
                setIsAscending(false);
            } else {
                setIsZip(false);
            }
        }
    }, [isNumUnits, isUnitType, isZip, isAscending]);

    useEffect(() => {
        setFilter('');
        setNumUnitsName(isNumUnits ? (isAscending ? "# Units ^": "# Units v") : "# Units");
        setUnitTypeName(isUnitType ? (isAscending ? "Units Type ^": "Units Type v") : "Units Type");
        setZipName(isZip ? (isAscending ? "Zip Code ^": "Zip Code v") : "Zip Code");
    }, [setFilter, isNumUnits, isUnitType, isZip, isAscending]);

    return (
        <Container>
            <Row className="g-3 justify-content-center" xs='auto'>
                <Col><h3>Sort By:</h3></Col>
                <Col>
                    <ButtonToolbar onClick={e =>{handleClick(e)}}>
                        <Button value='num_units' style={{margin:"0 10px"}}>{numUnitsName}</Button>
                        <Button value='unit_type' style={{margin:"0 10px"}}>{unitTypeName}</Button>
                        <Button value='zip' style={{margin:"0 10px"}}>{zipName}</Button>
                    </ButtonToolbar>
                </Col>
            </Row>
        </Container>
    );
}

const SearchBar = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submit");
    }

    return (
        <Form onSubmit={e => {handleSubmit(e)}} className="d-flex">
            <Form.Control
                type="search"
                placeholder="Search Housing"
                className="search_bar"
            />
            <Button type='submit' variant="outline-secondary" size='sm'><IconSearch /></Button>
        </Form>
    );
}

export default HousingGrid;