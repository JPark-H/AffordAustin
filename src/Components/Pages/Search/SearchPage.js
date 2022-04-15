import './SearchPage.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Spinner, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ChildCareInstanceCard from '../GridPages/InstanceCards/ChildCareInstanceCard';
import JobInstanceCard from '../GridPages/InstanceCards/JobInstanceCard';
import HousingInstanceCard from '../GridPages/InstanceCards/HousingInstanceCard';
import { IconSearch } from '@aws-amplify/ui-react';

const SearchPage = (starting_query) => {
    const [cPrograms, setCPrograms] = useState([]);
    const [houses, setHouses] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("search=");
    const [searchKeys, setSearchKeys] = useState([]);
    const [moreC, setMoreC] = useState(false);
    const [moreH, setMoreH] = useState(false);
    const [moreJ, setMoreJ] = useState(false);

    const getSearchData = useCallback (async () => {
        setLoading(true);
        if (query !== "search=") {
            const endpoint1 = `https://api.affordaustin.me/api/childcare?page[size]=100&page[number]=1&` + query;
            const endpoint2 = `https://api.affordaustin.me/api/housing?page[size]=100&page[number]=1&` + query;
            const endpoint3 = `https://api.affordaustin.me/api/jobs?page[size]=100&page[number]=1&` + query;
            let data = await axios.get(endpoint1);
            setMoreC(data.data.metadata.has_next);
            setCPrograms(data.data.attributes);
            data = await axios.get(endpoint2);
            setMoreH(data.data.metadata.has_next);
            setHouses(data.data.attributes);
            data = await axios.get(endpoint3);
            setMoreJ(data.data.metadata.has_next);
            setJobs(data.data.attributes);
            setSearchKeys(query.slice(7).split(" "));
        } else {
            setCPrograms([]);
            setHouses([]);
            setJobs([]);
            setSearchKeys([]);
        }
        setLoading(false);
    }, [query]);

    useEffect(() => {
        getSearchData();
    }, [query, getSearchData]);

    const getQuery = (new_query) => {
        setQuery(new_query);
    };

    return (
        <div style={{ backgroundColor: "#f0f2f5" }}>
            <div className='search_page mx-auto'>
                <h1 className='search_header'>Search</h1>
                <div className='search_page_bar'><SearchBar sendQuery={getQuery} /></div>
                {loading ? <Spinner animation='border' role="status"/> : <></>}
                <div className='search_grid mx-auto'>
                    <Container fluid>
                        <Row>
                            <h3 className='search_section_header'>Child Care</h3>
                        </Row>
                        <Row className="g-3 justify-content-center" xs='auto'>
                            {loading ? <></> : ((cPrograms.length < 1) ? <h3>No results</h3> : 
                                cPrograms.map(program => {
                                    return (
                                    <Col key={program.id}>
                                        <ChildCareInstanceCard child_care={program} id={program.id} search_keys={searchKeys}/>
                                    </Col>);
                                }))}
                        </Row>
                        <Row className="search_section_link">
                            {!moreC ? <></> : 
                                <Link to="/ChildCare"><p>Click to see all childcare results</p></Link>}
                        </Row>
                    </Container>
                </div>
                <div className='search_grid mx-auto'>
                    <Container fluid>
                        <Row>
                            <h3 className='search_section_header'>Housing</h3>
                        </Row>
                        <Row className="g-3 justify-content-center" xs='auto'>
                            {loading ? <></> : ((houses.length < 1) ? <h3>No results</h3> :
                                houses.map(house => {
                                    return (
                                    <Col key={house.id}>
                                        <HousingInstanceCard housing={house} housing_id={house.id} search_keys={searchKeys} />
                                    </Col>);
                                }))}
                        </Row>
                        <Row className="search_section_link">
                            {!moreH ? <></> : 
                                <Link to="/ChildCare"><p>Click to see all housing results</p></Link>}
                        </Row>
                    </Container>
                </div>
                <div className='search_grid mx-auto'>
                    <Container fluid>
                        <Row>
                            <h3 className='search_section_header'>Jobs</h3>
                        </Row>
                        <Row className="g-3 justify-content-center" xs='auto'>
                            {loading ? <></> : ((jobs.length < 1) ? <h3>No results</h3> :
                                jobs.map(job => {
                                    return (
                                    <Col key={job.id}>
                                        <JobInstanceCard job={job} id={job.id} search_keys={searchKeys} />
                                    </Col>);
                                }))}
                        </Row>
                        <Row className="search_section_link">
                            {!moreJ ? <></> : 
                                <Link to="/ChildCare"><p>Click to see all job results</p></Link>}
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    );
};

//Split to own file
const SearchBar = ({sendQuery}) => {
    const [form, setForm] = useState({});

    const setField = (field, value) => {
        setForm({...form,
        [field]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const query = (form['search'] === "") ? "" : "search=" + form['search'];
        sendQuery(query);
    }

    return (
        <Form onSubmit={e => {handleSubmit(e)}} className="d-flex">
            <Form.Control
                type="search"
                placeholder="Search"
                className="search_bar"
                onChange={ e => setField('search', e.target.value)}
            />
            <Button type='submit' variant="outline-secondary" size='sm'><IconSearch /></Button>
        </Form>
    );
}

export default SearchPage
