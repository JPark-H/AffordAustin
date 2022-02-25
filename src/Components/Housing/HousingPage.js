import './HousingPage.css';
import { Image, Nav, Navbar, Container, Button, Alert, Card, Row, Col, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from "react";
import MainNavBar from '../MainNavBar/MainNavBar';


/* grabbed from api*/
const housingInfo = {
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
  img: "",
}

//set image and map urls here.
/*
  Make sure to come back here for Nav Bar, move to own file eventually
*/

housingInfo.img = "https://rentpath-res.cloudinary.com/$img_current/t_3x2_webp_xl/t_unpaid/55754e0fd1c0a9ac53d7f36af593945b";

function HousingPage() {
  return (
    <div style={{ backgroundColor: "#f0f2f5" }}>
      <MainNavBar />
      <div className="info_page mx-auto justify-content-center">
        <p className="instance_header">
          {housingInfo.project_name}
        </p>
        <Container className="instance_info">
          {/* <p className="attribute_head d-inline-block text-truncate" style={{textAlign:"left", width: "50%"}}>Put like back button or ?</p>
          <hr style={{color:"#8c8a7f"}}/> */}

          <p className="attribute_head">Image</p>
          <Image className="h_image" rounded src={housingInfo.img}></Image>
          <p className="attribute_head">Map</p>
          <iframe rounded className="h_map mb-4"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1723.2088522797842!2d-97.76489096765725!3d30.253677616812844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b58823b5186b%3A0x5fe831e4bad332ec!2sLegacy%20apartment&#39;s!5e0!3m2!1sen!2sus!4v1645783505711!5m2!1sen!2sus"
            allowfullscreen loading="lazy">
          </iframe>
          <Card className="instance_data mx-auto">
            <Card.Header>Data</Card.Header>
            <ListGroup className="attribute_list" style={{textAlign:"left"}} variant="flush">
              <ListGroup.Item>Address: {housingInfo.address}</ListGroup.Item>
              <ListGroup.Item>ZIP Code: {housingInfo.zip_code}</ListGroup.Item>
              <ListGroup.Item>Status: {housingInfo.status.split(".")[1]}</ListGroup.Item>
              <ListGroup.Item>Developer: {housingInfo.developer}</ListGroup.Item>
              <ListGroup.Item>Unit Type: {housingInfo.unit_type}</ListGroup.Item>
              <ListGroup.Item>Ground Lease: {housingInfo.ground_lease}</ListGroup.Item>
              <ListGroup.Item>Tenure: {housingInfo.tenure}</ListGroup.Item>
              <ListGroup.Item>Affordability Guarantee: {housingInfo.affordability_expiration_year}</ListGroup.Item>
              <ListGroup.Item>Phone Number: {housingInfo.property_manager_phone_number}</ListGroup.Item>
              {/* Maybe eventually add like hover options that explain what each attirbute is */}
            </ListGroup>
          </Card>

        </Container>
      </div>
    </div>

  );
}

export default HousingPage;
