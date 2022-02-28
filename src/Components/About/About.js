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
						The cost of living in Austin has reportedly risen 17.8% since 2010. In the past 
						year alone, the listing prices for houses spiked 28%. At AffordAustin, we strive
						to provide fair living situations in Austin amidst harsh inflation by streamlining 
						the process of finding economic housing, child care, and work. 
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
