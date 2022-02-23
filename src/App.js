import logo from './logo.svg';
import './App.css';
import { Button, Alert, Card, Row, Col, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from "react";
//import 'bootstrap-icons/font/bootstrap-icons.css';
const Koala = "https://res.cloudinary.com/teepublic/image/private/s--xY-2bGLB--/t_Resized%20Artwork/c_fit,g_north_west,h_1054,w_1054/co_ffffff,e_outline:53/co_ffffff,e_outline:inner_fill:53/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_90,w_630/v1591112325/production/designs/10907156_0.jpg";
const teamInfo = [
	{
		name: "Koala 1",
		// username: "The Krusty Krab",
		// email: "knees weak",
		picture: Koala,
		role: "Sleeping",
		bio:
			"The Krusty Krab Pizza, is the Pizza, for you and me!",
		commits: 1192,
		issues: 0,
		tests: 0,
	},
	{
		name: "Koala 2",
		// username: "Bikini Bottom",
		// email: "arm's spaghetti",
		picture: Koala,
		role: "Hibernating",
		bio:
			"The fitness gram pacer test is a multi-stage aerobic ",
		commits: 0,
		issues: 0,
		tests: 271,
	},
	{
		name: "Koala 3",
		// username: "Goofy Goobers",
		// email: "Sakurajima Mai <3",
		picture: Koala,
		role: "Drinking",
		bio:
			"Have ",
		commits: 0,
		issues: 0,
		tests: 0,
	},
	{
		name: "Koala 4",
		// username: "Salty Spitoon",
		// email: "Lorem Ipsum",
		picture: Koala,
		role: "Breathing",
		bio:
			"My paws can't even reach the keyboard man",
		commits: 0,
		issues: 69,
		tests: 0,
	},
	{
		name: "Koala 5",
		// username: "Weenie Hut Jr",
		// email: "Inconceivable",
		picture: Koala,
		role: "Crying",
		bio: 
      "Do Koalas even have claws?",
		commits: 0,
		issues: 0,
		tests: 123,
	}
]



function MemberCards() {
  const [show, setShow] = useState(true);

  return (
    <><Row className="g-5 m-1 justify-content-center"  xs="auto" style={{width: "100%"}}>
      {teamInfo.slice(0, 5).map((teamMember) => {
        const { name, username, picture, email, role, bio, commits, issues, tests } = teamMember;
        return (
          <Col xs="auto" key={teamMember}>
            <Card style={{ width: '10em' }}>
              <Card.Img variant="top" src={picture}
                style={{ width: '10em', height: '10em', min_width: "80%"}} />
              <Card.Body style={{ backgroundColor: "pink", color: "#a60d45", width: "10em" }}>
                <Card.Title style={{ fontSize: '100%' }}>{name}</Card.Title>
                <Card.Subtitle style={{ fontSize: '80%' }} className="mb-1 text-muted">{role}</Card.Subtitle>
                <p style={{ fontSize: '55%' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
      </Row></>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MemberCards />
      </header>
    </div>
  );
}

export default App;
