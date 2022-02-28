import './ChildCare.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Container, Row, Col, Stack, Image, ListGroup } from 'react-bootstrap';

const ChildCare = ({ child_care }) => {
    // TODO: Update REGEX, breaks IOS, seems to break
    // job.description = job.description.replace(/(?<!\n)\n(?!\n) /g, '')

    return (
        <h3>{child_care.operation_name}</h3>
        // <div className='jobs'>
        //     <Container className='instance'>
        //         <Row>
        //             <Col className='header'>{ job.title }</Col>
        //         </Row>

        //         <Row className='align-items-center'>
        //             <Col><Image className='image' src={ job.image_H }></Image></Col>
        //             <Col><div className='map' dangerouslySetInnerHTML={{ __html: job.map_H }}></div></Col>
        //         </Row>

        //         <Row className='info'>
        //             <Col xs={8}>
        //                 <Stack>
        //                     <h3>Description</h3>
        //                     <p>{ job.description }</p>
        //                 </Stack>
        //             </Col>
        //             <Col xs={3}>
        //                 <Stack gap={3}>
        //                 <div class='company'>
        //                     <h4>Company</h4>
        //                     <p>{ job.company_name }</p>
        //                 </div>

        //                 <div class='via'>
        //                     <h4>Via</h4>
        //                     <p>{ job.via }</p>
        //                 </div>

        //                 <div class='features'>
        //                     <h4>Features</h4>
        //                     <ListGroup>
        //                         {job.features.map(feature => (
        //                             <ListGroup.Item key={feature}>{feature}</ListGroup.Item>
        //                         ))}
        //                     </ListGroup>
        //                 </div>

        //                 <div class='rating'>
        //                     <h4>Rating</h4>
        //                     <p><b>{ job.rating }</b> / 5 | { job.reviews} Reviews</p>
        //                 </div>
        //                 </Stack>
        //             </Col>
        //         </Row>
        //     </Container>
        // </div>
    );
};

const ChildCare1 = () => {
    const child_care = {
        "id":"1",
        "operation_type":"Licensed Center",
        "operation_name":"Zilker EAC YMCA",
        "programs_provided":"School Age Care,Children with Special Needs,After School Care,Snacks Provided,Field Trips",
        "location_address":"1900 BLUEBONNET LN  AUSTIN TX- 78704 3342",
        "mailing_address":"55 N INTERSTATE 35  AUSTIN TX- 78702 5209",
        "phone_number":"5122369622",
        "county":"TRAVIS",
        "website_address":"www.eacymca.org",
        "administrator_director_name":"Michelle Torres",
        "accepts_child_care_subsidies":"Y",
        "hours_of_operation":"02:45 PM-06:30 PM",
        "days_of_operation":"Mon,Tue,Wed,Thu,Fri",
        "licensed_to_serve_ages":"Pre-Kindergarten,School",
        "total_capacity":"85",
        "location_address_geo":{
            "latitude":"30.252383",
            "longitude":"-97.773635",
            "human_address":"{\"address\": \"1900 BLUEBONNET LN AUSTIN TX- 78704 3342\", \"city\": \"\", \"state\": \"\", \"zip\": \"\"}"
        },
        "email_address":"none"   
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
        "programs_provided":"Meals Provided ,After School Care,Snacks Provided,Drop-In Care,Skill Classes,Part Time Care,Transportation to/from School ,Field Trips",
        "location_address":"6507 JESTER BLVD BLDG II AUSTIN TX- 78750 8368",
        "mailing_address":"6507 JESTER BLVD BLDG II AUSTIN TX- 78750 8368",
        "phone_number":"5127958300",
        "county":"TRAVIS",
        "website_address":"www.childrenscenterofaustin.com",
        "administrator_director_name":"Erica Gonzales",
        "accepts_child_care_subsidies":"N",
        "hours_of_operation":"06:30 AM-06:00 PM",
        "days_of_operation":"Mon,Tue,Wed,Thu,Fri",
        "total_capacity":"275",
        "licensed_to_serve_ages":"Infant,Toddler,Pre-Kindergarten,School",
        "location_address_geo":{
            "latitude":"30.37021",
            "longitude":"-97.800817",
            "human_address":"{\"address\": \"6507 JESTER BLVD BLDG II AUSTIN TX- 78750 8368\", \"city\": \"\", \"state\": \"\", \"zip\": \"\"}"
        },
        "email_address":"jesteradmin@childrenscenterofaustin.com"
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
        "programs_provided":"Meals Provided ,Snacks Provided",
        "location_address":"17257 TOBERMORY DR  PFLUGERVILLE TX- 78660 1726",
        "mailing_address":"17257 TOBERMORY DR  PFLUGERVILLE TX- 78660 1726",
        "phone_number":"5129895977",
        "county":"TRAVIS",
        "website_address":"www.aplusdaycare.com",
        "administrator_director_name":"Damita Taymullah",
        "accepts_child_care_subsidies":"N",
        "hours_of_operation":"07:00 AM-05:30 PM",
        "days_of_operation":"Mon,Tue,Wed,Thu,Fri",
        "total_capacity":"12",
        "licensed_to_serve_ages":"Infant,Toddler,Pre-Kindergarten,School",
        "location_address_geo":{
            "latitude":"30.46847",
            "longitude":"-97.639908",
            "human_address":"{\"address\": \"17257 TOBERMORY DR PFLUGERVILLE TX- 78660 1726\", \"city\": \"\", \"state\": \"\", \"zip\": \"\"}"
        },
        "email_address":"Not provided"
    };

    return (
        <ChildCare child_care={ child_care }/>
    )
}

export { ChildCare1, ChildCare2, ChildCare3 };