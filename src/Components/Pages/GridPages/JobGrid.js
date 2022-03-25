import './Grid.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Container, Card, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Paginate from '../../Pagination/Pagination';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Koala from './../About/MemberCards/imgs/Koallaaaaa.png'

const JobGrid = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalNumJobs, setTotalNumJobs] = useState(1);
    const [jobsPerPage, setJobsPerPage] = useState(21);

    const getJobData = async (page, query) => {
        setLoading(true);
        axios.defaults.headers.common['Content-Type'] = 'application/vnd.api+json'
        axios.defaults.headers.common['Accept'] = 'application/vnd.api+json'
        const endpoint = `http://localhost:5000/api/jobs?page[size]=${jobsPerPage}&page[number]=${page}`;
        // const endpoint = `http://api.affordaustin.me/api/jobs?page[size]=${jobsPerPage}&page[number]=${page}`;
        const data = await axios.get(endpoint);
        setTotalNumJobs(data.data.meta.total);
        setJobs(data.data.data);
        setLoading(false);
    }

    useEffect(() => {
        getJobData(1, '');
    }, []);

    const paginate = (pageNum) => {
        setCurrentPage(pageNum);
        getJobData(pageNum, '');
    }

    return (
        <div className='jobGrid'>
            <Container fluid>
                <Row>
                    <Col className='header'>Jobs</Col>
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

    return (
        <Link to={ link }>
            <Card className='inst_card'>
                {/* Replace */}
                <Card.Img variant='top' src={ Koala } />
                <Card.Body>
                    <Card.Title className="text-truncate">{ job.title }</Card.Title>
                    <Card.Text><b>Company:</b> { job.company_name }</Card.Text>
                    <Card.Text><b>Posted:</b> { job.posted_at }</Card.Text>
                    <Card.Text><b>Schedule:</b> { job.schedule_type }</Card.Text>
                    <Card.Text><b>Rating:</b> { job.rating }</Card.Text>
                    <Card.Text><b>Reviews:</b> { job.reviews }</Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
};

export default JobGrid;
