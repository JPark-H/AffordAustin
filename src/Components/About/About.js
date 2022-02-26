import { Container, Button, Alert, Card, Row, Col, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from "react";
//import * as Icon from 'bootstrap-icons/font/bootstrap-icons.css';
import * as Icon from 'react-bootstrap-icons';
import { IconRotate_90DegreesCcw } from '@aws-amplify/ui-react';
import teamInfo from "./TeamData"
import './About.css'

function MemberCards() {
	return (
		<Container>
			<><Row className="g-5 m-0 justify-content-center" xs="auto" style={{ width: "100%" }}>
				{teamInfo.slice(0, 5).map((teamMember) => {
					const { name, username, picture, email, role, stack, bio, commits, issues, tests } = teamMember;
					return (
						<Col xs="auto" key={teamMember}>
							<Card style={{ width: '100%', borderRadius:"2rem"}}>
								<Card.Img variant="top" src={picture}
									className="about_card circle-rounded mb-0 mt-3 mx-auto" style = {{borderRadius:"2rem"}} />
								<Card.Body className="about_info" style={{ backgroundColor: "white", color: "black", width: "10em", borderRadius:"3rem" }}>
									<Card.Title className="mt-1 card_names">
										<strong>{name}</strong>
									</Card.Title>
									<Card.Subtitle className="role m-2 text-muted" style={{ fontSize: "100%" }}>
										{role}
										<br />
										{stack}
									</Card.Subtitle>
									<p className="about_text">
										{bio}
									</p>
									<hr className="mb-3 m-2" style={{ height: "2px" }} />
									<Row>
										<Col className="stats">
											<p className="stat_text">Commits</p>
											<Icon.Check2Circle style={{ color: "black" }}></Icon.Check2Circle>
											<p className="stat_num">{commits}</p>
										</Col>
										<Col className="stats">
											<p className="stat_text">Issues</p>
											<Icon.ListCheck></Icon.ListCheck>
											<p className="stat_num">{issues}</p>
										</Col>
										<Col className="tests">
											<p className="stat_text">Tests</p>
											<Icon.Wrench></Icon.Wrench>
											<p className="stat_num">{tests}</p>
										</Col>
									</Row>

								</Card.Body>
							</Card>
						</Col>
					);
				})}
			</Row></>
		</Container>
	);
}

function About() {
	return (
		<div className="App" style={{ backgroundColor: "#282c34", paddingBottom: "3em" }}>
			<MemberCards />
		</div>
	);
}

export default About;
