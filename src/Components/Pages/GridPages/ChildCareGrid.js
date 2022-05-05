import './Grid.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import React, { useState, useEffect, useCallback } from 'react';
import FSBar from './FSBar/FSBar';
import axios from 'axios';
import ChildCareInstanceCard from './InstanceCards/ChildCareInstanceCard';

const ChildCareGrid = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalNumPrograms, setTotalNumPrograms] = useState(1);
    const [programsPerPage, setProgramsPerPage] = useState(21);
    const [query, setQuery] = useState('');  
    const [searchKeys, setSearchKeys] = useState([]);

    const getChildCareData = useCallback (async () => {
        setLoading(true);
        let endpoint = `https://api.affordaustin.me/api/childcare?page[size]=${programsPerPage}&page[number]=${currentPage}`;
        endpoint += (query === "") ? "" : "&" + query;
        const data = await axios.get(endpoint);
        console.log(data);
        setTotalNumPrograms(data.data.metadata.total_count);
        setPrograms(data.data.attributes);
        setLoading(false);
    }, [currentPage, programsPerPage, query]);

    useEffect(() => {
        getChildCareData();
    }, [currentPage, query, searchKeys, getChildCareData]);

    const paginate = (pageNum) => {
        setCurrentPage(pageNum);
    };

    const getQuery = (new_query, new_search_query) => {
        let full_query = new_query;
        if (full_query !== "" && new_search_query != ""){
            full_query += new_search_query;
        }
        full_query += new_search_query;
        setQuery(full_query);
        let search_query = (new_search_query === "") ? [] : new_search_query.slice(7).split(" ");
        setSearchKeys(search_query);
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
                                <ChildCareInstanceCard child_care={program} id={program.id} search_keys={searchKeys}/>
                            </Col>);
                        })}
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default ChildCareGrid;