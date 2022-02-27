import './HousingGrid.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Container, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HousingGrid = () => {
    return (
        <div className="housing_background">
            <div class='housingGrid mx-auto'>
            <Container>
                <Row>
                    <Col className='header'>Housing</Col>
                </Row>
                    <h1 style = {{fontSize:"40px", textAlign:"center"}}>3 Results</h1>
                <Row className="g-3 m-0 justify-content-center" xs="auto">
                    <Col> <InstanceCard1 /> </Col>
                    <Col> <InstanceCard2 /> </Col>
                    <Col> <InstanceCard3 /> </Col>
                    
                </Row>
            </Container>
            </div>
        </div>
        
    )
};

const InstanceCard = ({ housing }) => {
    const link = `/Housing/${ housing.id }`;

    return (
        <Link to={ link }>
            <Card className='inst_card'>
                <Card.Img variant='top' src={housing.image} />
                <Card.Body>
                    <Card.Title className="text-truncate">{ housing.name }</Card.Title>
                    <Card.Text><b>Tenure :</b> { housing.tenure }</Card.Text>
                    <Card.Text><b>Unit-Type:</b> { housing.unit_type }</Card.Text>
                    <Card.Text><b>Num of Units:</b> { housing.num_units }</Card.Text>
                    <Card.Text><b>Ground Lease:</b> { housing.ground }</Card.Text>
                    <Card.Text><b>Zip-Code:</b> { housing.zip_code }</Card.Text>
                    
                </Card.Body>
            </Card>
        </Link>
    )
};

const InstanceCard1 = () => {
    const housing = {
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
        <InstanceCard housing={ housing } />
    );
}

const InstanceCard2 = () => {
    const housing = {
        'id': 2,
        'name': '1905 E 9th Street',
        'tenure': 'Rental',
        'unit_type': 'Single Family',
        'num_units': '1',
        'ground': 'No',
        'zip_code': '78702',
        'image': 'https://maps.googleapis.com/maps/api/streetview?channel=mb-pdp-publicrecord&location=1905+E+9th+St%2C+Austin%2C+TX+78702&size=665x441&source=outdoor&client=gme-redfin&signature=FMmyT_iA5x87udCGAaBpvurJ-F8='
    };

    return (
        <InstanceCard housing={ housing } />
    );
}

const InstanceCard3 = () => {
    const housing = {
        'id': 3,
        'name': '2009 Salina Street',
        'tenure': 'Rental',
        'unit_type': 'Multifamily',
        'num_units': '2',
        'ground': 'No',
        'zip_code': '78722',
        'image': 'https://maps.googleapis.com/maps/api/streetview?channel=mb-pdp-publicrecord&location=2009+Salina+St%2C+Austin%2C+TX+78722&size=665x441&source=outdoor&client=gme-redfin&signature=JNk1f3_rYdEWevy0acjXxgobz1o='
    };

    return (
        <InstanceCard housing={ housing } />
    )
}



export default HousingGrid;
