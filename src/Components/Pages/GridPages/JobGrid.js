import './Grid.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Card, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect, useCallback } from 'react';
import Paginate from '../../Pagination/Pagination';
import axios from 'axios';
import { Link } from 'react-router-dom';

const JobGrid = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalNumJobs, setTotalNumJobs] = useState(1);
    const [jobsPerPage, setJobsPerPage] = useState(21);

    const getJobData = useCallback (async (query) => {
        setLoading(true);
        axios.defaults.headers.common['Content-Type'] = 'application/vnd.api+json'
        axios.defaults.headers.common['Accept'] = 'application/vnd.api+json'
        const endpoint = `http://localhost:5000/api/jobs?page[size]=${jobsPerPage}&page[number]=${currentPage}`;
        // const endpoint = `https://api.affordaustin.me/api/jobs?page[size]=${jobsPerPage}&page[number]=${currentPage}`;
        const data = await axios.get(endpoint);
        setTotalNumJobs(data.data.meta.total);
        setJobs(data.data.data);
        setLoading(false);
    }, [currentPage, jobsPerPage]);

    useEffect(() => {
        getJobData('');
    }, [currentPage, getJobData]);

    const paginate = (pageNum) => {
        setCurrentPage(pageNum);
    }

    return (
        <div className='grid mx-auto'>
            <Container fluid>
                <Row>
                    <h1 className='grid_header'>Jobs</h1>
                </Row>
                <Row>
                     <Paginate totalInstances={totalNumJobs} pageLimit={jobsPerPage} paginate={paginate} />
                </Row>
                <h1 className="results">Showing {jobs.length} Results</h1>
                <Row className="g-3 justify-content-center" xs='auto'>
                    {loading ? <h3 className="results">Loading</h3> : jobs.map(job => {
                        return (
                        <Col key={job.id}>
                            <InstanceCard job={job.attributes} id={job.id}/>
                        </Col>);
                    })}
                </Row>
            </Container>
        </div>
    )
};

const InstanceCard = ({ job, id }) => {
    const link = `/Jobs/${ id }`;
    let extensions = job.detected_extensions.slice(1, (job.detected_extensions.length - 1)).split(", ");
    extensions = extensions.map(x => x.slice(1, x.length - 1).split("': '"));
    let posted_at = (extensions.length > 0 && extensions[0][0] === "posted_at") ? extensions[0][1] : "N/A";
    let schedule_type = (extensions.length > 1 && extensions[1][0] === "schedule_type") ? extensions[1][1] : "N/A";
    return (
        <Link to={ link }>
            <Card className='inst_card'>
                <Card.Img variant='top' src={job._image}/>
                <Card.Body>
                    <Card.Title className="text-truncate">{ job.title }</Card.Title>
                    <Card.Text><b>Company:</b> { job.company_name }</Card.Text>
                    <Card.Text><b>Posted:</b> { posted_at }</Card.Text>
                    <Card.Text><b>Schedule:</b> { schedule_type }</Card.Text>
                    <Card.Text><b>Rating:</b> { job.rating }</Card.Text>
                    <Card.Text><b>Reviews:</b> { job.reviews }</Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
};

export default JobGrid;
