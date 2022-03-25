import './GridPage.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Paginate from './../../Pagination/Pagination';
import CInstanceCard from './InstanceCards/CInstanceCard'
import HInstanceCard from './InstanceCards/HInstanceCard'
import JInstanceCard from './InstanceCards/JInstanceCard'

const GridPage = ({model}) => {
    const [instances, setInstances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalNumInstances, setTotalNumInstances] = useState(1);
    const [instancesPerPage, setInstancesPerPage] = useState(21);

    const getInstanceData = async (page, query) => {
        setLoading(true);
        axios.defaults.headers.common['Content-Type'] = 'application/vnd.api+json'
        axios.defaults.headers.common['Accept'] = 'application/vnd.api+json'
        const endpoint = `http://localhost:5000/api/${model.toLowerCase()}?page[size]=${instancesPerPage}&page[number]=${page}`;
        // const endpoint = `http://api.affordaustin.me/api/${model.toLowerCase()}?page[size]=${instancesPerPage}&page[number]=${page}`;
        const data = await axios.get(endpoint);
        setTotalNumInstances(data.data.meta.total);
        setInstances(data.data.data);
        setLoading(false);
    }

    useEffect(() => {
        getInstanceData(1, '');
    }, []);

    const paginate = (pageNum) => {
        setCurrentPage(pageNum);
        getInstanceData(pageNum, '');
    }

    return (
        <div style={{ backgroundColor: "#f0f2f5" }}>
            <div className='grid_page mx-auto'>
                <Container fluid>
                    <Row>
                        <Col className='header'>{model}</Col>
                    </Row>
                    <Row>
                        <Paginate totalInstances={totalNumInstances} pageLimit={instancesPerPage} paginate={paginate} />
                    </Row>
                    <Row>
                        <h1 style = {{fontSize:"40px", textAlign:"center"}}>Showing {instances.length} Results</h1>
                    </Row>
                    <Row className="g-3 justify-content-center" xs='auto'>
                        {loading ? <h3>Loading</h3> : instances.map(instance => {
                            return (
                            <Col key={instance.id}>
                                <InstanceCard model={model} attributes={instance.attributes} id={instance.id}/>
                            </Col>);
                        })}
                    </Row>
                </Container>
            </div>
        </div>
    );
}

const InstanceCard = ({model, id, attributes}) => {
    if (model === "Jobs") {
        return(<JInstanceCard job={attributes} id={id} />);
    } else if (model === "Housing") {
        return(<HInstanceCard housing={attributes} id={id} />);
    } else if (model === "Childcare") {
        return(<CInstanceCard child_care={attributes} id={id} />);
    } else {
        console.log("Problem");
        return;
    }
}

export default GridPage;