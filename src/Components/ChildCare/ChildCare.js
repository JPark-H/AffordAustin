import './ChildCare.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Container, Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ChildCare = ({ child_care }) => {
    return (
        <div style={{ backgroundColor: "#f0f2f5" }}>
            <div className="info_page mx-auto justify-content-center">
                <p className="instance_header">{child_care.operation_name}</p>
                <Container className="instance_info">
                    <p className="attribute_head">Location Image</p>
                    <Image className="h_image" rounded src={child_care.img}></Image>
                    <Row>
                        <Col>
                            <Card className="instance_data mx-auto" style={{
                                borderTopRightRadius: "2rem",
                                borderTopLeftRadius: "2rem"
                            }}>
                                <Card.Header style={{
                                    borderTopRightRadius: "2rem",
                                    borderTopLeftRadius: "2rem"
                                }}>Data</Card.Header>
                                <ListGroup className="attribute_list" style={{ textAlign: "left" }} variant="flush">
                                    <ListGroup.Item><b>Operation Type:</b> {child_care.operation_type}</ListGroup.Item>
                                    <ListGroup.Item><b>Programs Provided:</b> {child_care.programs_provided}</ListGroup.Item>
                                    <ListGroup.Item><b>Administrator's Name:</b> {child_care.administrator_director_name}</ListGroup.Item>
                                    <ListGroup.Item><b>Accepts Child Care Subsidies:</b> {child_care.accepts_child_care_subsidies}</ListGroup.Item>
                                    <ListGroup.Item><b>Days of Operation:</b> {child_care.days_of_operation}</ListGroup.Item>
                                    <ListGroup.Item><b>Hours of Operations:</b> {child_care.hours_of_operation}</ListGroup.Item>
                                    <ListGroup.Item><b>Licensed to Serve Ages:</b> {child_care.licensed_to_serve_ages}</ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="instance_data mx-auto" style={{
                                borderTopRightRadius: "2rem",
                                borderTopLeftRadius: "2rem"
                            }}>
                                <Card.Header style={{
                                    borderTopRightRadius: "2rem",
                                    borderTopLeftRadius: "2rem"
                                }}>Contact Information</Card.Header>
                                <ListGroup className="attribute_list" style={{ textAlign: "left" }} variant="flush">
                                    <ListGroup.Item><b>Phone Number:</b> {child_care.phone_number}</ListGroup.Item>
                                    <ListGroup.Item><b>Website:</b> <a href={child_care.website_address}>{child_care.website_address}</a></ListGroup.Item>
                                    <ListGroup.Item><b>Address:</b> {child_care.location_address}</ListGroup.Item>
                                    <ListGroup.Item><b>Mailing Address:</b> {child_care.mailing_address}</ListGroup.Item>
                                    <ListGroup.Item><b>County:</b> {child_care.county}</ListGroup.Item>
                                    <ListGroup.Item><b>Email Address:</b> {child_care.email_address}</ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <p className="attribute_head">Map</p>
                    <div className='h_map' dangerouslySetInnerHTML={{ __html: child_care.map }}></div>
                    <Row className="mt-3 justify-content-between mx-auto" >
                        <Link to='/Jobs'>
                        <Col className="mx-auto"><Button variant="secondary">Find Nearby Jobs</Button>{' '}</Col>
                        </Link>
                        <Link to='/Housing'>
                        <Col className="mx-auto"><Button variant="secondary">Find Nearby Housing</Button>{' '}</Col>
                        </Link>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

const ChildCare1 = () => {
    const child_care = {
        "id":"1",
        "operation_type":"Licensed Center",
        "operation_name":"Zilker EAC YMCA",
        "programs_provided":"School Age Care, Children with Special Needs, After School Care, Snacks Provided, Field Trips",
        "location_address":"1900 Bluebonnet Ln, Austin TX, 78704",
        "mailing_address":"55 N INTERSTATE 35, Austin TX 78702",
        "phone_number":"(512) 236-9622",
        "county":"TRAVIS",
        "website_address":"www.eacymca.org",
        "administrator_director_name":"Michelle Torres",
        "accepts_child_care_subsidies":"Yes",
        "hours_of_operation":"02:45 PM - 06:30 PM",
        "days_of_operation":"Monday-Friday",
        "licensed_to_serve_ages":"Pre-Kindergarten, School",
        "total_capacity":"85",
        "location_address_geo":{
            "latitude":"30.252383",
            "longitude":"-97.773635",
            "human_address":"{\"address\": \"1900 BLUEBONNET LN AUSTIN TX- 78704 3342\", \"city\": \"\", \"state\": \"\", \"zip\": \"\"}"
        },
        "email_address":"none",
        "img":"https://www.austinymca.org/themes/custom/www_bootstrap/logo.svg",
        "map":'<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6892.914952294049!2d-97.774567!3d30.252544000000004!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b527df4e3533%3A0xb48340c3315e1f89!2s1900%20Bluebonnet%20Ln%2C%20Austin%2C%20TX%2078704!5e0!3m2!1sen!2sus!4v1646089221646!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
    };

    return (
        <ChildCare child_care={ child_care }/>
    )
}

const ChildCare2 = () => {
    const child_care = {
        "id":"2",
        "operation_type":"Licensed Center",
        "operation_name":"Childrens Center of Austin",
        "programs_provided":"Meals Provided, After School Care, Snacks Provided, Drop-In Care, Skill Classes, Part Time Care, Transportation to/from School, Field Trips",
        "location_address":"6507 Jester Blvd Bldg II, Austin TX, 78750",
        "mailing_address":"6507 Jester Blvd Bldg II, Austin TX, 78750",
        "phone_number":"(512) 795-8300",
        "county":"TRAVIS",
        "website_address":"www.childrenscenterofaustin.com",
        "administrator_director_name":"Erica Gonzales",
        "accepts_child_care_subsidies":"No",
        "hours_of_operation":"06:30 AM-06:00 PM",
        "days_of_operation":"Monday-Friday",
        "total_capacity":"275",
        "licensed_to_serve_ages":"Infant, Toddler, Pre-Kindergarten, School",
        "location_address_geo":{
            "latitude":"30.37021",
            "longitude":"-97.800817",
            "human_address":"{\"address\": \"6507 JESTER BLVD BLDG II AUSTIN TX- 78750 8368\", \"city\": \"\", \"state\": \"\", \"zip\": \"\"}"
        },
        "email_address":"jesteradmin@childrenscenterofaustin.com",
        "img": "https://wp02-media.cdn.ihealthspot.com/wp-content/uploads/sites/567/2019/12/09185356/logo.png",
        "map":'<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6884.679779894778!2d-97.799367!3d30.369704999999996!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865b34b96502189f%3A0x974c7afd1bdf0293!2s6507%20Jester%20Blvd%2C%20Austin%2C%20TX%2078750!5e0!3m2!1sen!2sus!4v1646089350104!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
    };

    return (
        <ChildCare child_care={ child_care }/>
    )
}

const ChildCare3 = () => {
    const child_care = {
        "id":"3",
        "operation_type":"Licensed Child-Care Home",
        "operation_name":"A+ Kids Playschool",
        "programs_provided":"Meals Provided, Snacks Provided",
        "location_address":"17257 Tobermory Dr, Pflugerville TX, 78660",
        "mailing_address":"17257 Tobermory Dr, Pflugerville TX, 78660",
        "phone_number":"(512) 989-5977",
        "county":"TRAVIS",
        "website_address":"www.aplusdaycare.com",
        "administrator_director_name":"Damita Taymullah",
        "accepts_child_care_subsidies":"No",
        "hours_of_operation":"07:00 AM-05:30 PM",
        "days_of_operation":"Monday-Friday",
        "total_capacity":"12",
        "licensed_to_serve_ages":"Infant, Toddler, Pre-Kindergarten, School",
        "location_address_geo":{
            "latitude":"30.46847",
            "longitude":"-97.639908",
            "human_address":"{\"address\": \"17257 TOBERMORY DR PFLUGERVILLE TX- 78660 1726\", \"city\": \"\", \"state\": \"\", \"zip\": \"\"}"
        },
        "email_address":"none",
        "img":"https://static.wixstatic.com/media/c71ae4_5e977ff378404fb5a58ef32a74e1a11b~mv2_d_3024_4032_s_4_2.jpg/v1/fill/w_514,h_685,al_c,q_80,usm_0.66_1.00_0.01/c71ae4_5e977ff378404fb5a58ef32a74e1a11b~mv2_d_3024_4032_s_4_2.webp",
        "map":'<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3438.8636644116596!2d-97.64232048503123!3d30.468299481730075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644cfcfa0645413%3A0xe805c658d49d7710!2sA%2B%20Kids%20Playschool!5e0!3m2!1sen!2sus!4v1646089433674!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
    };

    return (
        <ChildCare child_care={ child_care }/>
    )
}

export { ChildCare1, ChildCare2, ChildCare3 };