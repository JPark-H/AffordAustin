import './JobGrid.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Container, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const JobGrid = () => {
    return (
        <div class='jobGrid'>
            <Container>
                <Row>
                    <Col className='header'>Jobs</Col>
                </Row>
                <h1 style = {{fontSize:"40px", textAlign:"center"}}>3 Results</h1>
                <Row className=" justify-content-center" xs="auto">
                    <Col> <InstanceCard1 /> </Col>
                    <Col> <InstanceCard2 /> </Col>
                    <Col> <InstanceCard3 /> </Col>
                </Row>
            </Container>
        </div>
    )
};

const InstanceCard = ({ job }) => {
    const link = `/Jobs/${ job.id }`;

    return (
        <Link to={ link }>
            <Card className='inst_card'>
                <Card.Img variant='top' src={ job.image_H } />
                <Card.Body>
                    <Card.Title className="text-truncate">{ job.title }</Card.Title>
                    <Card.Text><b>Company:</b> { job.company_name }</Card.Text>
                    <Card.Text><b>Posted:</b> { job.posted_at }</Card.Text>
                    <Card.Text><b>Schedule:</b> { job.schedule_type }</Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
};

const InstanceCard1 = () => {
    const job = {
        'id': 1,
        'title': 'Sourcing Analyst',
        'company_name': 'Visa',
        'posted_at': '2 days ago',
        'schedule_type': 'Full-Time',
        'image_H': 'https://media.bizj.us/view/img/11316712/research-park-plaza-1864*1200xx3000-1688-0-156.jpg'
    };

    return (
        <InstanceCard job={ job } />
    );
}

const InstanceCard2 = () => {
    const job = {
        'id': 2,
        'title': 'Server - Stella San Jac',
        'company_name': 'White Lodging',
        'posted_at': '3 days ago',
        'schedule_type': 'Full-Time',
        'image_H': 'https://images.squarespace-cdn.com/content/v1/587658442e69cfaf7ca23e53/1484172984491-PMJQPBRFE423YGHCP5MQ/stella+san+jac-9047.jpg?format=2500w'
    };

    return (
        <InstanceCard job={ job } />
    );
}

const InstanceCard3 = () => {
    const job = {
        'id': 3,
        'title': 'PRN Registered Nurse Weekends Home',
        'company_name': 'Brookdale Home Health',
        'posted_at': '11 days ago',
        'schedule_type': 'Full-Time',
        'image_H': 'https://www.brookdale.com/content/dam/brookdale/en/communities/photos/11109-brookdale-westlake-hills/brookdale-westlake-hills-entrance.jpg'
    };

    return (
        <InstanceCard job={ job } />
    )
}



export default JobGrid;
