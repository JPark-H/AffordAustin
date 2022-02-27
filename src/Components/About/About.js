import { Row, Container, Button, Card, Col, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import MemberCards from "./MemberCards/MemberCards"
import GitTotals from "./GitTotals/GitTotals"
import './About.css'
import * as Icon from 'react-bootstrap-icons';

const tools = ["React", "Amplify", "AWS", "Postman"];
const apis = ["api1", "api2", "api3", "api4"];


function About() {
	return (
		<div className="App" style={{ backgroundColor: "#f0f2f5", paddingBottom: "3em" }}>
			{/* About us block */}
			<h1 className="section_header">About Us</h1>
			<Container>
				<Card border="light" className='about_text mx-auto' style={{ borderRadius: "2rem" }}>
					<Card.Body className="" style={{ color: "black" }}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
						dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
						Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
						anim id est laborum.
					</Card.Body>
				</Card>
			</Container>

			{/* Member Cards */}
			<MemberCards />

			{/*Git Total Stats*/}
			<h1 className="section_header">Git Statistics</h1>
			<GitTotals />

			{/*Tool Info*/}
			<h1 className="section_header">Tools Used</h1>
			<Card border="light" className="instance_data mx-auto" style={{
				borderRadius: "2rem", borderTopLeftRadius: "2rem"
			}}>
				<ListGroup variant="flush" style={{
					borderRadius: "2rem",
				}}>
					{tools.map(tool => (<ListGroup.Item key={tool}>{tool}</ListGroup.Item>
					))}
				</ListGroup>
			</Card>

			{/*API Info*/}
			<h1 className="section_header">APIs</h1>
			<Card border="light" className="instance_data mx-auto" style={{
				borderRadius: "2rem", borderTopLeftRadius: "2rem"
			}}>
				<ListGroup variant="flush" style={{
					borderRadius: "2rem",
				}}>
					{apis.map(api => (<ListGroup.Item key={api}>{api}</ListGroup.Item>
					))}
				</ListGroup>
			</Card>

			<h1 className="section_header">Interesting Data</h1>
			<h2 className="temp_interesting">To be added...</h2>


		</div>
	);
}

export default About;
