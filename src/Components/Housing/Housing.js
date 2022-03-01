import './Housing.css';
import { Image, Container, Button, Card, Row, Col, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';


const Housing = ({ housing }) => {
  const link_j = `/Jobs/${ housing.id }`
  const link_c = `/Childcare/${ housing.id }`
  return (
    <div style={{ backgroundColor: "#f0f2f5" }}>
      <div className="info_page mx-auto justify-content-center">
        <p className="instance_header">
          {housing.project_name}
        </p>
        <Container className="instance_info">
          {/* <p className="attribute_head d-inline-block text-truncate" style={{textAlign:"left", width: "50%"}}>Put like back button or ?</p>
          <hr style={{color:"#8c8a7f"}}/> */}

          <p className="attribute_head">Location Image</p>
          <Image className="hous_image" rounded src={housing.img}></Image>
          <p className="attribute_head">Map</p>
          {/* <iframe rounded className="h_map mb-4"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1723.2088522797842!2d-97.76489096765725!3d30.253677616812844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b58823b5186b%3A0x5fe831e4bad332ec!2sLegacy%20apartment&#39;s!5e0!3m2!1sen!2sus!4v1645783505711!5m2!1sen!2sus"
            allowfullscreen loading="lazy">
          </iframe> */}
          <div className='hous_map' dangerouslySetInnerHTML={{ __html: housing.map }}></div>
          <Card className="instance_data mx-auto" style={{
            borderTopRightRadius: "2rem",
            borderTopLeftRadius: "2rem"
          }}>
            <Card.Header style={{
              borderTopRightRadius: "2rem",
              borderTopLeftRadius: "2rem"
            }}>Data</Card.Header>
            <ListGroup className="attribute_list" style={{ textAlign: "left" }} variant="flush">
              <ListGroup.Item>Address: {housing.address}</ListGroup.Item>
              <ListGroup.Item>ZIP Code: {housing.zip_code}</ListGroup.Item>
              <ListGroup.Item>Status: {housing.status.split(".")[1]}</ListGroup.Item>
              <ListGroup.Item>Developer: {housing.developer}</ListGroup.Item>
              <ListGroup.Item>Unit Type: {housing.unit_type}</ListGroup.Item>
              <ListGroup.Item>Ground Lease: {housing.ground_lease}</ListGroup.Item>
              <ListGroup.Item>Tenure: {housing.tenure}</ListGroup.Item>
              <ListGroup.Item>Affordability Guarantee: {housing.affordability_expiration_year}</ListGroup.Item>
              <ListGroup.Item>Phone Number: {housing.property_manager_phone_number}</ListGroup.Item>
              {/* Maybe eventually add like hover options that explain what each attirbute is */}
            </ListGroup>
          </Card>
          <Row className="mt-3 justify-content-between mx-auto" >
            <Link to={ link_j }>
              <Col className="mx-auto"><Button id="btn-back-to-top" variant="secondary">Nearby Job</Button>{' '}</Col>
            </Link>
            <Link to={ link_c }>
              <Col className="mx-auto"><Button variant="secondary">Child Care</Button>{' '}</Col>
            </Link>
          </Row>
        </Container>
      </div>
    </div>

  );
}

const Housing1 = () => {
  const housing = {
    id: "1",
    project_name: "Legacy Apartments",
    owner: "Mary Lee Community",
    developer: "Mary Lee Foundation",
    address: "1340 Lamar Square Drive",
    zip_code: "78704",
    total_units: "40.0",
    total_affordable_units: "40.0",
    total_accessible_units: "6.0",
    unit_type: "Multifamily",
    tenure: "Rental",
    program: "NHCD Program",
    status: "7. Project Completed",
    affordability_expiration_year: "2112",
    affordability_period: "99.0",
    fee_in_lieu_status: "None",
    units_30_mfi: "0",
    units_40_mfi: "0",
    units_50_mfi: "36",
    units_60_mfi: "0",
    units_65_mfi: "0",
    units_80_mfi: "4",
    units_100_mfi: "0",
    ground_lease: "No",
    smart_development: "Yes",
    longitude: "-97.76404",
    latitude: "30.253554",
    location: "(30.253554, -97.76404)",
    property_management_company: "Mary Lee Foundation",
    property_manager_phone_number: "(512) 443-5777",
    //This one is a temp attribute I added for now
    img: "https://rentpath-res.cloudinary.com/$img_current/t_3x2_webp_xl/t_unpaid/55754e0fd1c0a9ac53d7f36af593945b",
    map: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3446.423318091513!2d-97.76610078399467!3d30.25351761561851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b58823b5186b%3A0x5fe831e4bad332ec!2sLegacy%20apartment&#39;s!5e0!3m2!1sen!2sus!4v1645962157428!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
  }

  return (
    <Housing housing={housing} />
  )
}

const Housing2 = () => {
  const housing = {
    "id": "2",
    "austin_housing_inventory_id": "30.0",
    "project_id": "3277.0",
    "project_name": "1905 E 9th Street",
    "owner": "Blackshear Neighborhood Development Corporation",
    "developer": "Blackshear Neighborhood Development Corporation",
    "address": "1905 E 9th Street",
    "zip_code": "78702",
    "parcel_id": "0205081404",
    "council_district": "1.0",
    "total_units": "1.0",
    "total_affordable_units": "1.0",
    "unit_type": "Single Family",
    "tenure": "Rental",
    "program": "NHCD Program",
    "status": "7. Project Completed",
    "affordability_start_date": "20090915",
    "affordability_start_year": "2009",
    "affordability_expiration_date": "21080915",
    "affordability_expiration_year": "2108",
    "affordability_period": "99.0",
    "fee_in_lieu_status": "None",
    "units_30_mfi": "0",
    "units_40_mfi": "0",
    "units_50_mfi": "1",
    "units_60_mfi": "0",
    "units_65_mfi": "0",
    "units_80_mfi": "0",
    "units_100_mfi": "0",
    "market_rate_units": "0",
    "rental_housing_development": "Yes",
    "ownership_housing_development": "No",
    "private_activity_bonds": "No",
    "affordability_unlocked": "No",
    "partnership_austin_housing_fin": "No",
    "community_land_trust": "No",
    "downtown_density_bonus": "No",
    "down_payment_assistance": "No",
    "east_riverside_corridor_partn": "No",
    "ground_lease": "No",
    "master_development_agreements": "No",
    "municipal_utility_district": "No",
    "micro_unit_density_bonus": "No",
    "north_burnet_gateway_bonus": "No",
    "planned_unit_development_agree": "No",
    "planned_unit_development_bonus": "No",
    "rainey_density_bonus": "No",
    "smart_development": "Yes",
    "smart_greenfield": "No",
    "transit_oriented_development": "No",
    "university_neighborhood_overla": "No",
    "community_development_block_gr": "0",
    "vertical_mixed_use": "No",
    "voluntary": "No",
    "general_obligation_bond_2006": "16667",
    "general_obligation_bond_2013": "0",
    "hud_home_grant": "78750",
    "housing_trust_fund": "0",
    "cip_fund": "0",
    "city_amount": "95416.66",
    "low_income_housing_tax_credit": "N/A",
    "longitude": "-97.7210012928342",
    "latitude": "30.2639181308329",
    "location": "(30.2639181308329, -97.7210012928342)",
    "property_management_company": "Blackshear Neighborhood Development Corporation",
    "property_manager_phone_number": "(512) 476-2222",
    "img": 'https://maps.googleapis.com/maps/api/streetview?channel=mb-pdp-publicrecord&location=1905+E+9th+St%2C+Austin%2C+TX+78702&size=665x441&source=outdoor&client=gme-redfin&signature=FMmyT_iA5x87udCGAaBpvurJ-F8=',
    "map": '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3446.0594042844345!2d-97.72321588487969!3d30.263888581803002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b5b7c6b182f5%3A0x910c0f4de1308c2c!2s1905%20E%209th%20St%2C%20Austin%2C%20TX%2078702!5e0!3m2!1sen!2sus!4v1645961468830!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
  };

  return (
    <Housing housing={housing} />
  )
};

const Housing3 = () => {
  const housing = {
    "id": "3",
    "austin_housing_inventory_id": "33.0",
    "project_id": "3289.0",
    "project_name": "2009 Salina Street",
    "owner": "Blackland Community Development Corporation",
    "developer": "Blackland Community Development Corporation",
    "address": "2009 Salina Street",
    "zip_code": "78722",
    "parcel_id": "0211091207",
    "council_district": "1.0",
    "total_units": "6.0",
    "total_affordable_units": "6.0",
    "total_accessible_units": "2.0",
    "total_permanent_support": "0.0",
    "unit_type": "Multifamily",
    "tenure": "Rental",
    "program": "NHCD Program",
    "status": "7. Project Completed",
    "affordability_start_date": "20090901",
    "affordability_start_year": "2009",
    "affordability_expiration_date": "20190901",
    "affordability_expiration_year": "2019",
    "affordability_period": "10.0",
    "fee_in_lieu_status": "None",
    "units_30_mfi": "0",
    "units_40_mfi": "0",
    "units_50_mfi": "0",
    "units_60_mfi": "6",
    "units_65_mfi": "0",
    "units_80_mfi": "0",
    "units_100_mfi": "0",
    "market_rate_units": "0",
    "rental_housing_development": "Yes",
    "ownership_housing_development": "No",
    "private_activity_bonds": "No",
    "affordability_unlocked": "No",
    "partnership_austin_housing_fin": "No",
    "community_land_trust": "No",
    "downtown_density_bonus": "No",
    "down_payment_assistance": "No",
    "east_riverside_corridor_partn": "No",
    "ground_lease": "No",
    "master_development_agreements": "No",
    "municipal_utility_district": "No",
    "micro_unit_density_bonus": "No",
    "north_burnet_gateway_bonus": "No",
    "planned_unit_development_agree": "No",
    "planned_unit_development_bonus": "No",
    "rainey_density_bonus": "No",
    "smart_development": "No",
    "smart_greenfield": "No",
    "transit_oriented_development": "No",
    "university_neighborhood_overla": "No",
    "community_development_block_gr": "0",
    "vertical_mixed_use": "No",
    "voluntary": "No",
    "general_obligation_bond_2006": "0",
    "general_obligation_bond_2013": "0",
    "hud_home_grant": "197143",
    "housing_trust_fund": "0",
    "cip_fund": "0",
    "city_amount": "197142.85",
    "low_income_housing_tax_credit": "N/A",
    "longitude": "-97.7222834520494",
    "latitude": "30.2813953297002",
    "location": "(30.2813953297002, -97.7222834520494)",
    "property_management_company": "Blackland Community Development Corporation",
    "property_manager_phone_number": "(512) 220-8751",
    "img": 'https://maps.googleapis.com/maps/api/streetview?channel=mb-pdp-publicrecord&location=2009+Salina+St%2C+Austin%2C+TX+78722&size=665x441&source=outdoor&client=gme-redfin&signature=JNk1f3_rYdEWevy0acjXxgobz1o=',
    "map": '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.450681980708!2d-97.72443728399439!3d30.28122901430095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b594f4faad7b%3A0x6075d16828d4cbf5!2s2009%20Salina%20St%2C%20Austin%2C%20TX%2078722!5e0!3m2!1sen!2sus!4v1645962714268!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
  };

  return (
    <Housing housing={housing} />
  )
};

export { Housing1, Housing2, Housing3 }
