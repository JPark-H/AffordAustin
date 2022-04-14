import './FSBar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect, useCallback } from 'react';
import Paginate from './Pagination';
import HousingFilterBar from './FilterBar/HousingFilterBar';
import JobFilterBar from './FilterBar/JobFilterBar';
import ChildcareFilterBar from './FilterBar/ChildcareFilterBar';
import HousingSortBar from './SortBar/HousingSortBar';
import JobSortBar from './SortBar/JobSortBar';
import ChildcareSortBar from './SortBar/ChildcareSortBar';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { IconSearch } from '@aws-amplify/ui-react';

const FSBar = ({totalInstances, pageLimit, paginate, currentPage, sendQuery, model}) => {
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
    const last_result = (totalInstances / pageLimit > currentPage) ? (first_result + pageLimit - 1) : (first_result - 1 + totalInstances % pageLimit);
    return (
        <Container className='grid_fs_bar'>
            <Row className='grid_filters'><FilterBar sendQuery={updateFilterQuery} model={model} /></Row>
            <Row className='grid_sorters'><SortBar sendQuery={updateSortQuery} model={model} /></Row>
            <Row className='grid_ps_bar' xs='auto'>
                <Col style={{marginRight:'auto'}}><Paginate totalInstances={totalInstances} pageLimit={pageLimit} paginate={paginate} /></Col>
                <Col><h3>Showing Results {first_result}-{last_result} of {totalInstances}</h3></Col>
                <Col style={{marginLeft:'auto'}}><SearchBar sendQuery={updateSearchQuery}/></Col>
            </Row>
        </Container>
    );
}

const FilterBar = ({sendQuery, model}) => {
    if (model === "Housing") {
        return <HousingFilterBar sendQuery={sendQuery} />;
    } else if (model === "Childcare") {
        return <ChildcareFilterBar sendQuery={sendQuery} />;
    } else {
        return <JobFilterBar sendQuery={sendQuery} />;
    }
}

const SortBar = ({sendQuery, model}) => {
    if (model === "Housing") {
        return <HousingSortBar sendQuery={sendQuery} />;
    } else if (model === "Childcare") {
        return <ChildcareSortBar sendQuery={sendQuery} />;
    } else {
        return <JobSortBar sendQuery={sendQuery} />;
    }
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
        sendQuery("search=" + form['search']);
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

export default FSBar;