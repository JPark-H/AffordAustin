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
                    <Card.Title className="text-truncate">{ child_care.operation_name }</Card.Title>
                    <Card.Text><b>Address:</b> { child_care.location_address }</Card.Text>
                    <Card.Text><b>County:</b> { child_care.county }</Card.Text>
                    <Card.Text><b>Days of Operation:</b> { child_care.days_of_operation }</Card.Text>
                    <Card.Text><b>Hours of Operation:</b> { child_care.hours_of_operation }</Card.Text>
                    <Card.Text><b>Programs Provided:</b> { child_care.programs_provided}</Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
};

const InstanceCard1 = () => {
    const child_care = {
        "id":"1",
        "operation_name":"Zilker EAC YMCA",
        "programs_provided":"School Age Care, Children with Special Needs, After School Care, Snacks Provided, Field Trips",
        "location_address":"1900 BLUEBONNET LN  AUSTIN TX- 78704 3342",
        "county":"TRAVIS",
        "hours_of_operation":"02:45 PM-06:30 PM",
        "days_of_operation":"Mon,Tue,Wed,Thu,Fri",
        'image': 'https://www.austinymca.org/themes/custom/www_bootstrap/logo.svg'
    };

    return (
        <InstanceCard child_care={ child_care } />
    );
}

const InstanceCard2 = () => {
    const child_care = {
        "id":"2",
        "operation_name":"Childrens Center of Austin",
        "programs_provided":"Meals Provided, After School Care, Snacks Provided, Drop-In Care, Skill Classes, Part Time Care, Transportation to/from School, Field Trips",
        "location_address":"6507 JESTER BLVD BLDG II AUSTIN TX- 78750 8368",
        "county":"TRAVIS",
        "hours_of_operation":"06:30 AM-06:00 PM",
        "days_of_operation":"Mon,Tue,Wed,Thu,Fri",
        'image': 'https://wp02-media.cdn.ihealthspot.com/wp-content/uploads/sites/567/2019/12/09185356/logo.png'
    };

    return (
        <InstanceCard child_care={ child_care } />
    );
}

const InstanceCard3 = () => {
    const child_care = {
        "id":"3",
        "operation_name":"A+ Kids Playschool",
        "programs_provided":"Meals Provided, Snacks Provided",
        "location_address":"17257 TOBERMORY DR  PFLUGERVILLE TX- 78660 1726",
        "county":"TRAVIS",
        "hours_of_operation":"07:00 AM-05:30 PM",
        "days_of_operation":"Mon,Tue,Wed,Thu,Fri",
        'image': 'https://static.wixstatic.com/media/c71ae4_5e977ff378404fb5a58ef32a74e1a11b~mv2_d_3024_4032_s_4_2.jpg/v1/fill/w_514,h_685,al_c,q_80,usm_0.66_1.00_0.01/c71ae4_5e977ff378404fb5a58ef32a74e1a11b~mv2_d_3024_4032_s_4_2.webp'
    };

    return (
        <InstanceCard child_care={ child_care } />
    );
}

export default ChildCareGrid;