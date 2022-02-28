import './ChildCareGrid.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Container, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ChildCareGrid = () => {
    return (
        <div style={{ backgroundColor: "#f0f2f5" }}>
            <div class='child_care_grid mx-auto'>
                <Container>
                    <Row>
                        <Col className='header'>Child Care</Col>
                    </Row>
                    <h1 style = {{fontSize:"40px", textAlign:"center"}}>3 Results</h1>
                    <Row className="g-3 justify-content-center" xs="auto">
                        <Col> <InstanceCard1 /> </Col>
                        <Col> <InstanceCard2 /> </Col>
                        <Col> <InstanceCard3 /> </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

const InstanceCard = ({ child_care }) => {
    const link = `/ChildCare/${ child_care.id }`;

    return (
        <Link to={ link }>
            <Card className='inst_card'>
                <Card.Img variant='top' src={child_care.image} />
                <Card.Body>
                    <Card.Title className="text-truncate">{ child_care.name }</Card.Title>
                    <Card.Text><b>Tenure :</b> { child_care.tenure }</Card.Text>
                    <Card.Text><b>Unit-Type:</b> { child_care.unit_type }</Card.Text>
                    <Card.Text><b>Num of Units:</b> { child_care.num_units }</Card.Text>
                    <Card.Text><b>Ground Lease:</b> { child_care.ground }</Card.Text>
                    <Card.Text><b>Zip-Code:</b> { child_care.zip_code }</Card.Text>
                    
                </Card.Body>
            </Card>
        </Link>
    )
};

const InstanceCard1 = () => {
    const child_care = {
        'id': 1,
        'name': 'Legacy Apartments',
        'tenure': 'Rental',
        'unit_type': 'Multifamily',
        'num_units': '6',
        'ground': 'No',
        'zip_code': '78704',
        'image': 'https://rentpath-res.cloudinary.com/$img_current/t_3x2_webp_xl/t_unpaid/55754e0fd1c0a9ac53d7f36af593945b'
    };

    return (
        <InstanceCard child_care={ child_care } />
    );
}

const InstanceCard2 = () => {
    const child_care = {
        'id': 1,
        'name': 'Legacy Apartments',
        'tenure': 'Rental',
        'unit_type': 'Multifamily',
        'num_units': '6',
        'ground': 'No',
        'zip_code': '78704',
        'image': 'https://rentpath-res.cloudinary.com/$img_current/t_3x2_webp_xl/t_unpaid/55754e0fd1c0a9ac53d7f36af593945b'
    };

    return (
        <InstanceCard child_care={ child_care } />
    );
}

const InstanceCard3 = () => {
    const child_care = {
        'id': 1,
        'name': 'Legacy Apartments',
        'tenure': 'Rental',
        'unit_type': 'Multifamily',
        'num_units': '6',
        'ground': 'No',
        'zip_code': '78704',
        'image': 'https://rentpath-res.cloudinary.com/$img_current/t_3x2_webp_xl/t_unpaid/55754e0fd1c0a9ac53d7f36af593945b'
    };

    return (
        <InstanceCard child_care={ child_care } />
    );
}

export default ChildCareGrid;