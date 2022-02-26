import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import MemberCards from "./MemberCards/MemberCards"
import './About.css'


function About() {
	return (
		<div className="App" style={{ backgroundColor: "#f0f2f5", paddingBottom: "3em" }}>
			<MemberCards />
		</div>
	);
}

export default About;
