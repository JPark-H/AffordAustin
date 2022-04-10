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
    const [query, setQuery] = useState('');

    const getHousingData = useCallback (async () => {
        setLoading(true);
        axios.defaults.headers.common['Content-Type'] = 'application/vnd.api+json';
        axios.defaults.headers.common['Accept'] = 'application/vnd.api+json';
        const endpoint = `https://api.affordaustin.me/api/housing?page[size]=${housesPerPage}&page[number]=${currentPage}`;
        const data = await axios.get(endpoint);
        setTotalNumHouses(data.data.meta.total);
        setHouses(data.data.data);
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
                        <FSBar totalInstances={totalNumHouses} pageLimit={housesPerPage} paginate={paginate} currentPage={currentPage} sendQuery={getQuery}/>
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

const FSBar = ({totalInstances, pageLimit, paginate, currentPage, sendQuery}) => {
    const [filterQuery, setFilterQuery] = useState('');
    const [sortQuery, setSortQuery] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const getQuery = useCallback(() => {
        let fullQuery = filterQuery;
        if (filterQuery !== '' && sortQuery !== '') {
            fullQuery += '&';
        }
        fullQuery += sortQuery;
        if ((filterQuery !== '' || sortQuery !== '') && searchQuery !== '') {
            fullQuery += '&';
        }
        fullQuery += searchQuery;
        console.log(fullQuery);
        sendQuery(fullQuery);
    }, [filterQuery, sortQuery, searchQuery]);

    const updateFilterQuery = (query) => {
        setFilterQuery(query);
    }

    const updateSortQuery = (query) => {
        setSortQuery(query);
    }

    const updateSearchQuery = (query) => {
        setSearchQuery(query);
    }

    useEffect(() => {
        getQuery();
    }, [filterQuery, sortQuery, searchQuery, getQuery])

    const first_result = ((currentPage - 1) * pageLimit) + 1;
    const last_result = (totalInstances / pageLimit > currentPage) ? (first_result + pageLimit) : (first_result + totalInstances % pageLimit);
    return (
        <Container className='grid_fs_bar' style={{backgroundColor:'white', width:'90%', marginBottom:'15px', outlineStyle:'solid', outlineColor:'lightgray', outlineWidth:'thin', paddingTop:'10px'}}>
            <Row className='grid_filters' style={{paddingBottom:"20px", marginLeft:'15px', marginRight:'15px'}}><FilterBar sendQuery={updateFilterQuery}/></Row>
            <Row className='grid_sorters' style={{paddingBottom:'20px', marginLeft:'15px', marginRight:'15px'}}><SortBar sendQuery={updateSortQuery}/></Row>
            <Row className='grid_ps_bar' xs='auto' style={{marginLeft:'15px', marginRight:'15px'}}>
                <Col style={{marginRight:'auto'}}><Paginate totalInstances={totalInstances} pageLimit={pageLimit} paginate={paginate} /></Col>
                <Col><h3 className="result">Showing Results {first_result}-{last_result} of {totalInstances}</h3></Col>
                <Col style={{marginLeft:'auto'}}><SearchBar sendQuery={updateSearchQuery}/></Col>
            </Row>
        </Container>
    );
}

//Change values to queries
const FilterBar = ({sendQuery}) => {
    const [form, setForm] = useState({
        'NumUnitsFilter': '', 
        'TenureFilter': '', 
        'UnitTypeFilter': '', 
        'ZipcodeFilter': '', 
        'GroundLeaseFilter': ''
    });

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
    }

    useEffect(() => {
        let isNotEmpty = form['NumUnitsFilter'] !== '';
        let filterQuery = form['NumUnitsFilter'];

        if ( isNotEmpty && form['TenureFilter'] !== '') {
            filterQuery += '&';
        }
        filterQuery += form['TenureFilter'];
        isNotEmpty = isNotEmpty || form['TenureFilter'] !== '';

        if (isNotEmpty && form['UnitTypeFilter'] !== '') {
            filterQuery += '&';
        }
        filterQuery += form['UnitTypeFilter'];
        isNotEmpty = isNotEmpty || form['UnitTypeFilter'] !== '';

        if (isNotEmpty && form['ZipcodeFilter'] !== '') {
            filterQuery += '&';
        }
        filterQuery += form['ZipcodeFilter'];
        isNotEmpty = isNotEmpty || form['ZipcodeFilter'] !== '';

        if ( isNotEmpty && form['GroundLeaseFilter'] !== '') {
            filterQuery += '&';
        }
        filterQuery += form['GroundLeaseFilter'];
        
        sendQuery(filterQuery);
    }, [form])

    return (
        <div style={{ textAlign:'center' }}>
            <h3>Filters:</h3>
            <Form>
                <Row className="g-3 justify-content-center" xs='auto'>
                    <Form.Group controlId='NumUnitsFilter' as={Col}>
                        <Form.Label>Number of Units</Form.Label>
                        <Form.Select
                            className='filter_select'
                            onChange={e => setField('NumUnitsFilter', e.target.value)}
                        >
                            <option value=''>Select #Units</option>
                            <option value='5'>&lt;5</option>
                            <option value='5-10'>5-10</option>
                            <option value='10-50'>10-50</option>
                            <option value='50-100'>50-100</option>
                            <option value='100+'>100+</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId='TenureFilter' as={Col}>
                        <Form.Label>Tenure</Form.Label>
                        <Form.Select
                            className='filter_select'
                            onChange={e => setField('TenureFilter', e.target.value)}
                        >
                            <option value=''>Select Tenure</option>
                            <option value='Rental'>Rental</option>
                            <option value='Ownership'>Ownership</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId='UnitTypeFilter' as={Col}>
                        <Form.Label>Unit Type</Form.Label>
                        <Form.Select
                            className='filter_select'
                            onChange={e => setField('UnitTypeFilter', e.target.value)}
                        >
                            <option value=''>Select Type</option>
                            <option value='Single Family'>Single Family</option>
                            <option value='Multifamily'>Multifamily</option>
                            <option value='Duplex'>Duplex</option>
                            <option value='Fourplex'>Fourplex</option>
                            <option value='ADU'>ADU</option>
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
                                    setField('ZipcodeFilter', e.target.value);
                                }
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId='GroundLeaseFilter' as={Col}>
                        <Form.Label>Ground Lease</Form.Label>
                        <Form.Select 
                            className='filter_select'
                            onChange={e => setField('GroundLeaseFilter', e.target.value)}
                        >
                            <option value=''>Ground Lease</option>
                            <option value='yes'>Available</option>
                            <option value='no'>Not Available</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
            </Form>
        </div>
    );
}

//Change values to queries
const SortBar = ({sendQuery}) => {
    const [isNumUnits, setIsNumUnits] = useState(false);
    const [isUnitType, setIsUnitType] = useState(false);
    const [isZip, setIsZip] = useState(false);
    const [isAscending, setIsAscending] = useState(false);
    const [numUnitsName, setNumUnitsName] = useState("# Units");
    const [unitTypeName, setUnitTypeName] = useState("Unit Type");
    const [zipName, setZipName] = useState("Zip Code");
    const [query, setQuery] = useState("");

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
                setQuery("sort ascending by number of units");
            } else if (isAscending){
                setIsAscending(false);
                setQuery("sort descending by number of units");
            } else {
                setIsNumUnits(false);
                setQuery("");
            }
        } else if (button === 'unit_type') {
            if (!isUnitType) {
                setIsNumUnits(false);
                setIsUnitType(true);
                setIsZip(false);
                setIsAscending(true);
                setQuery("sort ascending by unit type");
            } else if (isAscending){
                setIsAscending(false);
                setQuery("sort descending by unit type");
            } else {
                setIsUnitType(false);
                setQuery("");
            }
        } else if (button === 'zip') {
            if (!isZip) {
                setIsNumUnits(false);
                setIsUnitType(false);
                setIsZip(true);
                setIsAscending(true);
                setQuery("sort ascending by zipcode");
            } else if (isAscending){
                setIsAscending(false);
                setQuery("sort descending by zipcode");
            } else {
                setIsZip(false);
                setQuery("");
            }
        }
    }, [isNumUnits, isUnitType, isZip, isAscending]);

    useEffect(() => {
        setFilter('');
        setNumUnitsName(isNumUnits ? (isAscending ? "# Units ^": "# Units v") : "# Units");
        setUnitTypeName(isUnitType ? (isAscending ? "Units Type ^": "Units Type v") : "Units Type");
        setZipName(isZip ? (isAscending ? "Zip Code ^": "Zip Code v") : "Zip Code");
        sendQuery(query);
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

const SearchBar = ({sendQuery}) => {
    const [form, setForm] = useState({});

    const setField = (field, value) => {
        setForm({...form,
        [field]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendQuery(form['search']);
    }

    return (
        <Form onSubmit={e => {handleSubmit(e)}} className="d-flex">
            <Form.Control
                type="search"
                placeholder="Search Housing"
                className="search_bar"
                onChange={ e => setField('search', e.target.value)}
            />
            <Button type='submit' variant="outline-secondary" size='sm'><IconSearch /></Button>
        </Form>
    );
}

export default HousingGrid;