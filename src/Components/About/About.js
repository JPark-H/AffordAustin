import { Row, Container, Button, Card, Col, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import MemberCards from "./MemberCards/MemberCards"
import GitTotals from "./GitTotals/GitTotals"
import './About.css'
import * as Icon from 'react-bootstrap-icons';
import axios from "axios";
import { useEffect, useState } from 'react';
import teamInfo from './TeamData'
const tools = ["React", "Amplify", "GitLab", "NameCheap", "Postman"];

const tools_desc = ["UI components and building the web app", 
"frontend deployment",
"collaborative development",
"domain name acquisition",
"RESTful API design and documentation"]

const apis = ["api1", "api2", "api3", "api4"];

let total_issues = 0;
let total_commits = 0;

const contributor_to_team_num = {
	"Sca": 0,
	"Din": 1,
	"Jay": 2,
	"Pre": 3,
	"Sab": 4,
	"sha": 4
}

function About() {
	const[ total_commits, setCommits ] = useState(0);
	const[ total_issues, setIssues ] = useState(0);
	useEffect(() => {
		async function getGitlabStats() {
			await axios.get('https://gitlab.com/api/v4/projects/33875511/repository/contributors').then(resp => {
				let c = 0;
				resp.data.forEach((contributor) => {
					const { name, email, commits } = contributor;
					let team_num = contributor_to_team_num[name.substring(0,3)];
					teamInfo[team_num]["commits"] = commits;  
					c += commits;
				});
				setCommits(c);
			});
			await axios.get('https://gitlab.com/api/v4/projects/33875511/issues?state=closed').then(resp => {
				let i = 0;
				resp.data.forEach((issue) => {
					i += 1;
					const { assignees } = issue;
					assignees.forEach((assignee) => {
						const { name } = assignee;
						let team_num = contributor_to_team_num[name.substring(0,3)];
						teamInfo[team_num]["issues"] += 1;
					});
				});
				setIssues(i);
			});
		};
		getGitlabStats();
	}, []);
	return (
		<div className="App" style={{ backgroundColor: "#f0f2f5", paddingBottom: "3em" }}>
			{/* About us block */}
			<h1 className="section_header">About Us</h1>
			<Container>
				<Card border="light" className='about_text mx-auto' style={{ borderRadius: "2rem" }}>
					<Card.Body className="" style={{ color: "black" }}>
						The cost of living in Austin has reportedly risen 17.8% since 2010. In the past 
						year alone, the listing prices for houses spiked 28%. At AffordAustin, we strive
						to provide plausible living situations in Austin amidst harsh inflation by streamlining 
						the process of finding economic housing, child care, and work. 
					</Card.Body>
				</Card>
			</Container>

			{/* Member Cards */}
			<MemberCards teamInfo={teamInfo}/>

			{/*Git Total Stats*/}
			<h1 className="section_header">Git Statistics</h1>
			<GitTotals total_commits={total_commits} total_issues={total_issues}/>

			{/*Tool Info*/}
			<h1 className="section_header">Tools Used</h1>
			<Card border="light" className="instance_data mx-auto" style={{
				borderRadius: "2rem", borderTopLeftRadius: "2rem"
			}}>
				<ListGroup variant="flush" style={{
					borderRadius: "2rem",
				}}>
					{tools.map((tool, index) => (<ListGroup.Item key={tool}>{tool}<br></br>{tools_desc[index]}</ListGroup.Item>
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
