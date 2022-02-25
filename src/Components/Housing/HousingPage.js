import './HousingPage.css';
import { Image, Nav, Navbar, Container, Button, Alert, Card, Row, Col, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from "react";
import * as Icon from 'react-bootstrap-icons';
import { IconRotate_90DegreesCcw } from '@aws-amplify/ui-react';


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


function HousingPage() {
  return (
    <div className="App" style={{ backgroundColor: "#f0f2f5" }}>
      <div className="info_page mx-auto justify-content-center">
        <p className="instance_header">
          {housingInfo.project_name}
        </p>
        <Container className="instance_info">
          {/* <p className="attribute_head d-inline-block text-truncate" style={{textAlign:"left", width: "50%"}}>Put like back button or ?</p>
          <hr style={{color:"#8c8a7f"}}/> */}

          <p className="attribute_head">Images</p>
          
          <p className="attribute_head">Map</p>
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
